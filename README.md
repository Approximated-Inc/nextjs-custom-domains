# Next.js Custom Domains Example

#### Setup the `ENV`

```env
# the domain that your app runs on
NEXT_PUBLIC_APP_PRIMARY_DOMAIN=jsguide.approximated.app
# the API key that is assigned to this app/cluster
APPROXIMATED_API_KEY=f58f2f81-00b0-4628-83a7-6aef4b63a59c-0000000000
```

## Pages Router

#### Using middleware to handle requests

You can use middleware to capture the request before it hits your page for rendering. You can use this to prepare a request before it hits your page, block or stop requests, preform redirects, or use the domain to preform authentication.

See [middleware.ts](middleware.ts).

#### Using API routes to handle requests

If you have API endpoints in your app that need to use the domain the process is similar to middleware. You can grab the domain off the header and use that in the rest of your code.

See [pages/api/host.ts](pages/api/host.ts).

#### Using `getServerSideProps` in pages

Like the API route, you can grab the domain off the headers in the request. You can the use that as `props` in your page when it is rendering.

See [pages/index.tsx](pages/index.tsx).

## App Router

#### Using route handlers

If you are using the new `app` directory, you have access to route handlers. Like the other methods, you can pull the domain that is in the request headers.

See [app/app-hosts/route.ts](app/app-hosts/route.ts).

#### Using app pages

If you are using the new `app` directory, you can use server side functions in your pages through server components.

See [app/ssr-page/page.tsx](app/ssr-page/page.tsx).