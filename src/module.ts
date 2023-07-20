import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addRouteMiddleware,
  addComponent,
  addComponentsDir,
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@ecomsilver/consumer",
    configKey: "ecomsilver",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: "http://localhost:3000",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addComponent({
    //   name: 'EditableTextBlock',
    //   export: 'EditableTextBlock',
    //   filePath: resolver.resolve('runtime/components/EditableTextBlock.vue'),
    //   global: true
    // })
    nuxt.options.runtimeConfig.public.ecomsilver = options;
    addComponentsDir({
      path: resolver.resolve("runtime/components"),
      pathPrefix: false,
      global: true,
    });
    addPlugin(resolver.resolve("./runtime/plugin"));
    addPlugin(resolver.resolve("./runtime/isIframe.client"));
    addRouteMiddleware({
      name: "pageContent",
      path: resolver.resolve(__dirname, "./runtime/middleware/pageContent"),
    });
  },
});
