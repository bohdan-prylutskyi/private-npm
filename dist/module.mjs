import { defineNuxtModule, createResolver, addComponentsDir, addPlugin, addRouteMiddleware } from '@nuxt/kit';



// -- Unbuild CommonJS Shims --
import __cjs_url__ from 'url';
import __cjs_path__ from 'path';
import __cjs_mod__ from 'module';
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require = __cjs_mod__.createRequire(import.meta.url);
const module = defineNuxtModule({
  meta: {
    name: "@ecomsilver/consumer",
    configKey: "ecomsilver",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: "http://localhost:3000"
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    nuxt.options.runtimeConfig.public.ecomsilver = options;
    addComponentsDir({
      path: resolver.resolve("runtime/components"),
      pathPrefix: false,
      global: true
    });
    addPlugin(resolver.resolve("./runtime/plugin"));
    addPlugin(resolver.resolve("./runtime/isIframe.client"));
    addRouteMiddleware({
      name: "pageContent",
      path: resolver.resolve(__dirname, "./runtime/middleware/pageContent")
    });
  }
});

export { module as default };
