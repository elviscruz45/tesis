import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    /**
     * Your UploadThing app id. You can find this on the UploadThing dashboard.
     * @default `env.UPLOADTHING_APP_ID`
     */
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    /**
     * Your UploadThing API key. You can find this on the UploadThing dashboard.
     * @default `env.UPLOADTHING_KEY`
     */
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});
