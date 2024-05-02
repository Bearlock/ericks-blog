---
title: Tilt and Task
description: Exploring Tilt and Task as the automation/orchestration/composition layer for local development
date: 2024-05-01
draft: false
tags: ["code", "devex", "infra"]
---

A frictionless development environment is hard to achieve.

It's harder to make that repeatable and idempotent on every developer's machine in an org. A few sticking points for any org of a particular size are:

- Onboarding new software engineers quickly, quietly, and with as little fuss as possible
- Blowing away a local dev environment (safely) and setting it up again in a timely manner
- Reducing the amount of toil and cognitive overhead the stuff above entails

For most shops, onboarding/setup of a project is a hodge-podge of tribal knowledge, scripts, spit, and luck. Some places are able to inject a little more rigor into their process and adopt tools like [`make`][make], or lean into baking scripts into their `package.json` (or whatever their stack's equivalent is).

And to be honest, it's a good move. `make` is ubiquituous — you can find it on almost any machine or OS, the syntax is straightforward enough, and it starts to give the setup of a project some semblance of structure.

The problem with this more rigourous process is that composition or orchestration of various elements is unwieldy. Often, getting a project ready for development involves jitterbugging through a series of complex steps, chaining together actions, installing dependencies, handling known failure modes, and ensuring everything works as expected.

![Pepe Silvia][pepesilvia] *It can leave you a little... flustered*

## Task

[Task][task] is `make`'s younger, more verbose cousin. From its inception it was made out to be a snappier, easier to use `make`,  built in `Go`. There are several quality of life improvements `Task` provides outta the box that I'm a fan of:

- OS-specific `Taskfiles` — you can have a clear delineation between what automation means on _this_ OS versus _that_ OS.
- Including (or even overriding) `Taskfiles` — you can create a library of useful `Taskfiles` that can be included in several projects. Heck, if you don't like how a particular project does things, you can bring your own, perfectly minted, `Taskfile`.
- Task dependencies and concurrency — similar to `make`, you can have tasks depend on each other, but beyond that, _you can make tasks run concurrently_. If two tasks _don't_ depend on each other, there's no reason not to run them in parallel.
- Prevention of `Task` run — `Task` includes a mechanism to _not run_ if some defined dependency or file is already up to date. That's huge! You don't have to go through the whole rigamarole of running some unnecessary command.
- And more — they provide some cool looping semantics, ease of interfacing with environment variables, documentation via descriptions and summaries, etc.

Here's an example `Taskfile`. See how easy it is to read?

```yaml
version: '3'

tasks:
  setup:
    desc: Initial setup — prepares the project for development
    summary: |
      Initial setup — prepares the project for development
      This will set up the project for development. It will check, install and
      configure the following dependencies
      - Homebrew
      - AWS CLI
      - gum
      - direnv
      - nvm
      - yarn
    cmds:
      - ./bin/setup

  up:
    desc: Starts database container and development server
    summary: |
      Starts database container and development server
      This will call `docker compose up`, install any node dependencies and
      start the development server
    cmds:
      - ./bin/up

  down:
    desc: Stops containers
    summary: |
      Stops containers
      This will bring down any of this project's running containers
    cmds:
      - docker compose down

  techdocs:
    desc: Starts techdocs preview server
    summary: |
      Starts techdocs preview server
      This will start up a techdocs preview server. This'll render and display
      any available tech docs. Under the hood it calls
      `npx @techdocs/cli serve`
      Note — you cannot run the development server and the techdocs preview
      server at the same time
    cmds:
      - ./bin/techdocs
```

This could add all the rigor an org could want while reducing some of the cognitive overhead or tribal knowledge introduced by a vanilla `Makefile`

## Tilt

[Tilt][tilt] on the other hand, is a _totally_ different beast. It's a... development automation framework? `Tilt` supports `Tiltfiles` written in the Starlark dialect (a subset of Python). It provides _a lot_ functionality and semantics to make development easier, but it's still a little abstract to just.. talk about it. Lemme see if I can do better.

`Tilt` let's you define various resources/bundles-of-work. It can be a Docker image, Kubernetes YAML, or even a command that's running on your local machine. These're all defined in a `Tiltfile`. When you `tilt up`, `Tilt` will apply all the resources defined therein (unless you specify otherwise, which is a nice escape hatch).

A lot of the magic or power comes from this... control loop `Tilt` exposes. It'll watch any dependencies (implicit and explicit) to a bundle of work. For example, say that you've defined a Docker image as a resource — any changes to the `Dockerfile` will result in `Tilt` reapplying the resource, i.e, building the Docker image again.

The magic is even more magical with K8s resources.

Let's say you define a `deployment` that includes a Docker image and some source code as its dependencies. Any changes to _either_ will result in a full rebuild and reapplication of the `deployment` to the target Kubernetes cluster. It reduces the need to manually build the image, push the image to the cluster, and restart/redeploy the `deployment`. It's _magic_.

Here's an example `Tiltfile`:

```python
# Adding minimum tilt version 'cause version pinning feels good.
version_settings(constraint='>=0.33.11')
load('ext://dotenv', 'dotenv')

if config.tilt_subcommand == 'up':
  if not os.path.exists('.envrc'):
    print("Repo has not been setup")
    print("Beginning setup now...")
    local('./bin/setup-no-asks')

    dotenv()

    print(os.environ)
  local(
    'source ~/.nvm/nvm.sh ;\
      nvm use 18'
  )

# Read from our docker-compose file
docker_compose('compose.yaml', env_file='.env', project_name='backstage', profiles=["*"])

dc_resource('db')
dc_resource('datadog', auto_init=False)

local_resource('env vars', 'direnv allow . && eval "$(direnv export zsh)"', deps=['.envrc'])
local_resource('backstage server', cmd='yarn install', serve_cmd='yarn dev', deps=['package.json', 'app-config.yaml', 'app-config.local.yaml', '.envrc'], resource_deps=['db', 'env vars'])
```

This does the following:
- Sets up a `db` and `datadog` `docker compose` resources
- Defines a local resource, `env vars`, that watches the `.envrc` file and runs some `direnv` goodness to make environment variables available
- Defines a local resource, `backstage server` that will initially run `yarn install` and then subsequently `yarn dev` to start a development server, if any changes occur to `package.json`, etc.
- Does some stuff _solely_ on `tilt up` (like check if the `.envrc` file exists; if it doesn't it assumes this is a first time setup).

This is short, but it's really all I need to have a super powerful local development loop for developing a [Backstage][backstage] app. It's almost like having a project-wide REPL.

## Better Together

Individually, `Task` and `Tilt` are powerful automation and development onboarding/setup/dev loop tools. I would argue that putting them _together_ could yield some crazy-good results in terms of reducing overhead and toil, supercharging developers, and contextualizing/spreading-all-the-knowledge the development environment for a project. This is probably something I'm gonna be doing sometime in the near future myself.

[backstage]: https://backstage.io
[make]: https://www.gnu.org/software/make/manual/make.html
[tilt]: https://tilt.dev
[task]: https://taskfile.dev
[pepesilvia]: ../../assets/pepesilvia.jpeg
