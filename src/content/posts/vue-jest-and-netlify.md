---
title: Vue, Jest, and Netlify
description: Exploring Vue, using Jest for tests, and deploying everything with Netlify
date: 2018-05-29
draft: false
tags: ["code", "node", "infra", "ci-cd"]
---

## Frontend programming is hard

Frontend programming is difficult to do rigorously. It's too easy to cobble together some frontend code that kinda works. Crafting a good user experience with a coherent UI is a craft and a science. And to be honest, a good UX/UI usually makes or breaks a product. The word often tossed around in regards to a good UI is "delightful". A quick Google search yields the following definition for delight:

> _verb_: to please greatly  
_noun_: great pleasure 

UI/UX design is imperative. Regardless of who the audience or customer is, there **is** an audience or customer. A frontend acts as an ambassador, guide, and interface to a brand, to philosophies, or to empowerment.

## A good UI makes you feel good

Right away, the word _delight_ indicates an emotional connection. To me, there has also always been a connotation of surprise tacked onto the feeling of delight. Delight is a genuine (and maybe unexpected) smile. Software devs sometimes lose sight of form in the form-function dichotomy. Form and function need to complement each other. Harmony in form and function is rare, and rarer still is a delightful product experience. These ideas and concepts fall squarely into design territory, but can't be ignored. Rather, developers need to adapt the learned concepts and standards inherent in the field of design and apply them to software. But, even knowing good design principles and applying them doesn't make the work any easier. It just makes it better.

## Vue helps a little

Good frontend programming is harder. Not just the design aspect of it, but all of it. Between frameworks, tooling, libraries, browser compatiblity, mobile responsiveness, accessibility, testing, etc. It can get overwhelming. The ("new") hotness in frontend programming is component-based programming. I love the OO principle of `favoring composition over inheritance`, so I drank deep from this kool-aid. We use [Vue][vuejs] where I work, but I would be just as happy using other component-based vehicles ([React][reactjs], [mithril][mithriljs]). There are pros and cons to Vue, but as a framework it enables me to evaluate my design choices. This isn't to say I write good frontend code (I don't), but I'm learning to make good design decisions and considerations. Effective tools are those that make doing the right thing, the easy thing. 

## Jest helps some too

I've never done any sort of frontend testing. It was a little intimidating, but reading up on (and using) [Jest][jesttest] and the [Vue test utils][vuetest] made it a little more manageable. There was a learning curve as well as some configuration that wasn't the easiest to figure out. Once the work was done and a testing pattern/template established it became much easier. 


My favorite thing about Jest is how out-of-the-box everything is. I'm used to a setup like the following:

- Mocha as my test runner
- Chai for BDD assertions
- Sinon for mocking
- SinonChai for some syntatic sugar
- Proxyquire for injecting my own mocked dependencies
- Nyc for test coverage/reporting
- Probably some other stuff I'm forgetting

Managing that many dependencies can become a pain and unruly quickly. Jest gives me all of the above functionality as well as some other bells and whistles (asynchronous test suites are nice, snapshot tests are cool!).

The Vue Test Utils library was also essential for my testing process because of how easily it let me manipulate and do things within the scope of Vue. Making my own fake Vue instance, rendering Vue code on the fly, etc. All of that helped me write coherent tests.

## Netlify completes the stack

From an Ops perspective, [Netlify][netlify] is the bees knees. TravisCi + Netlify is exceeding my CI/CD needs and expectations. TravisCi runs and verifies my builds while Netlify gives me deploy previews(!!), branch deploys, and other things I never knew I needed. I've been digging this pattern because Travis can give me automated unit and integration testing insights while Netlify can help me leverage frictionless acceptance testing from stakeholders. It's everything I want out of a deployment pipeline.

## Anyway, have some config

The hardest part of figuring all of this out was figuring out the right incantations, er, config settings. So here is my current setup.

### .travis.yml

This is a pretty stupid simple Travis config. It runs stuff using yarn/node, it doesn't email me, and it posts stuff into our company bot channel.

```yaml
language: node_js
node_js:
- 9.0.0

install: yarn
script: yarn run test
notifications:
  email: false
  slack:
    secure: [some-token-here]
```

### package.json (partial)

This is a partial package.json. This whole project was  init'ed using Vue CLI 3 and the build scripts reflect that. 

```json
{
  "name": "some-app",
  "version": "1.0",
  "private": "maybe",
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "prod-build": "vue-cli-service build",
    "stage-build": "vue-cli-service build --mode staging",
    "dev-build": "vue-cli-service build --mode development",
    "test": "vue-cli-service test --env=jsdom --browser",
    "lint": "vue-cli-service lint",
    "lint:fix": "eslint --fix src/**/*.js",
    "updateSnap": "vue-cli-service test --updateSnapshot"
  },
  "dependencies": {
    . . .
    "@vue/cli-plugin-unit-jest": "^3.0.0-beta.6",
    "vue": "^2.5.13",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
    . . .
  },
  "devDependencies": {
    . . .
    "@vue/cli-plugin-babel": "^3.0.0-beta.6",
    "@vue/cli-plugin-eslint": "^3.0.0-beta.6",
    "@vue/cli-service": "^3.0.0-beta.6",
    "@vue/test-utils": "^1.0.0-beta.13",
    "babel-core": "^7.0.0-0",
    "babel-jest": "^22.0.4",
    "jest": "^22.4.3",
    "vue-server-renderer": "^2.5.16",
    . . .
  },
  "babel": {
    "presets": [
      "@vue/app"
    ]
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  }
}
```

### netlify.toml

This is the Netlify config file. Before this, I'd never even heard of `.toml`. The comments explain stuff nicely.

```toml
[Settings]
  ID = "some-netlify-id"

# Settings in the [build] context are global and are applied 
# to all contexts unless overridden by more specific contexts.

# Everything publishes to the 'dist' directory, so it isn't
# necessary to specify a 'publish' directory in specific contexts

# Check out all the .toml options here: https://www.netlify.com/docs/netlify-toml-reference/
# Anything in this file will override any settings set in the netlify site

[build] # default context
  # This is where netlify will look for a package.json
  base = ""

  # This is the finished build directory
  publish = "dist"

  # This is the default build command (overridden in more specific contexts)
  command = "yarn run dev-build"

  # This is where netlify will look for any lambda functions
  functions = ""

[context.production]
  command = "yarn run prod-build"
  
[context.deploy-preview]
  command = "yarn run dev-build"

[context.master] # master branch _is_ the dev build/branch
  command = "yarn run dev-build"

[context.staging]
  command = "yarn run stage-build"
```

### jest.config.js

This sets up Jest. We tell it to collect coverage, what to collect coverage from, what files to test, what to transform with what, what to do with certain file types, etc. One stop shop for Jest.

Really, the most important things on here are the `transform` section and the `moduleNameMapper` section. The transform section transpiles files with a `.vue` extension using the `vue-jest` package (Jest doesn't know what to do with Vue out of the box), and it transpiles `.jsx` files using `babel-jest` (for a similar reason).

The mapper below is nifty for mocking static assets. Jest tests get weird if they don't know what to do with certain file types. That super long regex below matches any static file type (that I've bothered to mention) and mocks it using my `filesMock.js`. That file is a one liner, looks like this: `module.exports = "test-file-stub";`. `stylesMock` is similar for similar reasons: `module.exports = {}`.

```javascript
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!.eslintrc.js",
    "!jest.config.js",
    "!vue.config.js",
    "!src/store/index.js",
    "!**/__mocks__/**",
    "!**/__snapshots__/**"
  ],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  verbose: true
};
```

### vue.config.js

This little config file is to disable the host check within Webpack (which Vue Cli 3 uses under the hood). Without it, running stuff locally gets weird.

```javascript
module.exports = {
  devServer: {
    disableHostCheck: true
  }
};
```
 
## Make the right thing the easy thing

Frontend programming is hard, but effective tools, processes, and pipelines can mitigate some of the difficulty. Making software is already hard, frontend work can sometimes be harder. Alleviating that pain comes through discipline and proper planning, so say it with me:

Make the right thing the easy thing.

## Some supplemental material

I like reading code, I figure sometimes others wanna read code. Here is a dump of a Vue route I helped write to upload files to Firebase/Google Cloud Storage. Below that will be its respective [test suite](#upload-spec-js).

### Upload.vue

```html
<template>
  <div class="container">
      <h1>Upload Files</h1>
      <DragAndDrop></DragAndDrop>
      <div v-if="uploadingFileCount > 0">
        <table>
          <tr>
            <th>File Name</th>
            <th>Size</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
          <tr v-for="file in uploadingFiles" :key="file.id">
            <td>{{ file.name }}</td>
            <td>{{ file.size }}</td>
            <td>
              <progress v-if="!file.isCanceled" :value="file.progress" max="100"></progress>
              <strong class="canceled" v-if="file.isCanceled">Upload Canceled</strong>
            </td>
            <td>
              <!-- Pause and resume icons show when they're applicable -->
              <span v-if="file.progress !== 100" @click="toggleUpload(file)">
                <font-awesome-icon :class="iconColor(file)" size="lg" :icon="toggleIcon(file)"></font-awesome-icon>
              </span>
              <!-- Cancel icon shows while upload is in progress -->
              <span v-if="!file.isCanceled && file.progress !== 100" @click="cancelUpload(file)">
                <font-awesome-icon class="canceled fa-icon" size="lg" icon="ban"></font-awesome-icon>
              </span>
              <!-- Checkmark shows if upload is complete -->
              <span v-if="file.progress === 100">
                <font-awesome-icon :icon="['far', 'check-circle']" class="checkmark" size="lg" tada></font-awesome-icon>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <!--SUCCESS-->
      <div v-if="uploadedFiles.length > 0">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
      </div>
    </div>
</template>

<script>
import DragAndDrop from "@/components/DragAndDrop";

export default {
  components: { DragAndDrop },
  computed: {
    uploadingFiles() {
      return this.$store.getters["file/getUploadingFiles"];
    },
    uploadedFiles() {
      return this.$store.getters["file/getUploadedFiles"];
    },
    uploadingFileCount() {
      return this.$store.getters["file/getUploadingFileCount"];
    }
  },
  methods: {
    toggleIcon(file) {
      if (file.isPaused) return ["far", "play-circle"];
      return ["far", "pause-circle"];
    },
    iconColor(file) {
      if (file.isPaused) return "resume fa-icon";
      return "pause fa-icon";
    },
    toggleUpload(file) {
      if (file.isPaused) return file.uploadTask.resume();
      else return file.uploadTask.pause();
    },
    cancelUpload(file) {
      file.isCanceled = true;
      file.uploadTask.resume();
      return file.uploadTask.cancel();
    }
  }
};
</script>

<style scoped>
progress {
  border: 0;
  height: 18px;
  border-radius: 9px;
  width: 100%;
}
::-webkit-progress-bar {
  background-color: #a8aeb7;
}
progress[value]::-webkit-progress-value {
  background: #3fb776;
}
table {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: center;
}
th {
  background-color: #1dcad0;
  color: white;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}

.fa-icon {
  cursor: pointer;
  padding-right: 5px;
}

.resume {
  color: #1dcad0;
}

.pause {
  color: #a8aeb7;
}

.canceled {
  color: #f6417a;
}

.checkmark {
  color: #3fb776;
}
</style>
```

### Upload.spec.js

```javascript
import { shallow, createLocalVue } from "@vue/test-utils";
import { createRenderer } from "vue-server-renderer";
import fontAwesome from "@fortawesome/fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import Vuex from "vuex";

import Upload from "@/routes/Upload";

const localVue = createLocalVue();
fontAwesome.library.add(solid, regular);

localVue.component("fontAwesomeIcon", FontAwesomeIcon);
localVue.use(Vuex);

describe("Upload route", () => {
  let computed;
  let getters;
  let store;
  let mockFile;

  beforeEach(() => {
    getters = {};
    computed = {};

    mockFile = {
      name: "Mock File",
      size: 1234,
      progress: 34,
      isCanceled: false,
      isPaused: false,
      id: 1,
      uploadTask: {
        pause() {
          mockFile.isPaused = true;
        },
        resume() {
          mockFile.isPaused = false;
        },
        cancel() {
          mockFile.isCanceled = true;
        }
      }
    };

    getters = {
      ["file/getUploadingFiles"]: jest.fn().mockReturnValue([mockFile]),
      ["file/getUploadedFiles"]: jest.fn().mockReturnValue([]),
      ["file/getUploadingFileCount"]: jest.fn().mockReturnValue(1)
    };

    store = new Vuex.Store({
      state: {},
      getters
    });
  });

  it("pauses the file upload if pause button is clicked", () => {
    const upWrapper = shallow(Upload, { store, localVue });
    const toggleUploadSpy = jest.spyOn(upWrapper.vm, "toggleUpload");
    expect(mockFile.isPaused).toBeFalsy();

    upWrapper.find("[data-icon='pause-circle']").trigger("click");

    expect(toggleUploadSpy).toHaveBeenCalled();
    expect(mockFile.isPaused).toBeTruthy();
  });

  it("resumes the file upload if the play button is clicked", () => {
    computed.uploadingFiles = () => {
      mockFile.isPaused = true;
      return [mockFile];
    };

    const upWrapper = shallow(Upload, { store, localVue, computed });
    const toggleUploadSpy = jest.spyOn(upWrapper.vm, "toggleUpload");
    expect(mockFile.isPaused).toBeTruthy();

    upWrapper.find("[data-icon='play-circle']").trigger("click");

    expect(toggleUploadSpy).toHaveBeenCalled();
    expect(mockFile.isPaused).toBeFalsy();
  });

  it("cancels the file upload if the cancel button is clicked", () => {
    const upWrapper = shallow(Upload, { store, localVue });
    const cancelUploadSpy = jest.spyOn(upWrapper.vm, "cancelUpload");
    expect(mockFile.isCanceled).toBeFalsy();

    upWrapper.find("[data-icon='ban']").trigger("click");

    expect(cancelUploadSpy).toHaveBeenCalled();
    expect(mockFile.isCanceled).toBeTruthy();
  });

  it("renders a table row for each file in uploading files", () => {
    computed.uploadingFiles = () => [
      mockFile,
      Object.assign({}, mockFile, { id: 2 }),
      Object.assign({}, mockFile, { id: 3 })
    ];

    const upWrapper = shallow(Upload, { store, localVue, computed });

    expect(upWrapper.findAll("[data-icon='pause-circle']").length).toBe(3);
  });

  it("displays a checkmark for a completed upload", () => {
    computed.uploadingFiles = () => [
      Object.assign({}, mockFile, { progress: 100 })
    ];
    const upWrapper = shallow(Upload, { store, localVue, computed });

    expect(upWrapper.contains("[data-icon='check-circle']")).toBeTruthy();
  });

  it("displays a counter of successfully uploaded files", () => {
    computed.uploadedFiles = () => [mockFile];
    const upWrapper = shallow(Upload, { store, localVue, computed });

    expect(upWrapper.find("h2").html()).toBe(
      "<h2>Uploaded 1 file(s) successfully.</h2>"
    );
  });

  it("doesn't display a table unless there are files uploading", () => {
    computed.uploadingFileCount = () => 0;
    const upWrapper = shallow(Upload, { store, localVue, computed });

    expect(upWrapper.find("table").exists()).toBeFalsy();
  });

  it("displays a file's name, size, and progress", () => {
    const upWrapper = shallow(Upload, { store, localVue });
    const tdArray = upWrapper.findAll("td");

    // V-bind attributes are no longer html attributes, but rather DOM properties:
    // https://forum.vuejs.org/t/v-bind-not-working-with-attributes-in-test/19894/6
    expect(upWrapper.find("progress").element.value).toBe("34");
    expect(tdArray.at(0).html()).toBe(`<td>${mockFile.name}</td>`);
    expect(tdArray.at(1).html()).toBe(`<td>${mockFile.size}</td>`);
  });

  it("matches snapshot", () => {
    const renderer = createRenderer();
    const upWrapper = shallow(Upload, { store, localVue });

    return renderer
      .renderToString(upWrapper.vm)
      .then(html => expect(html).toMatchSnapshot());
  });
});
```


[vuejs]: https://vuejs.org/
[reactjs]: https://reactjs.org/
[mithriljs]: https://mithril.js.org/
[jesttest]: https://facebook.github.io/jest/en/
[vuetest]: https://vue-test-utils.vuejs.org/
[netlify]: https://www.netlify.com/
