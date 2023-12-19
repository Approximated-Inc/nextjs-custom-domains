# Next.js Custom Domains Example

This is an example repo to help you understand how you could implement custom domains easily as a feature in your Next.js app using [Approximated](https://approximated.app).

## How it works

The example app is just a basic fresh Next.js app, with both pages directory and app directory in use.

The example purpose of this app is to conditionally display content depending on if the request occurs on a custom domain.

There is also an example of how to create and manage virtual hosts using the Approximated API.

## Trying it out

#### Setup the `ENV`

```sh
cp .env.example .env
```

Inside the `.env` you can control the details about your setup:

```env
# the domain that your app runs on
NEXT_PUBLIC_APP_PRIMARY_DOMAIN=jsguide.approximated.app
# the API key that is assigned to this app/cluster
APPROXIMATED_API_KEY=f58f2f81-00b0-4628-83a7-6aef4b63a59c-0000000000
```

This assumes that you have NPM installed:

```sh
npm install
npm run dev
```

You should now have a server running on localhost. Usually `http://localhost:3000`.

## Assets and CORS

If your app is linking to assets with absolute paths/URLs, changing it to a relative path should fix any CORS issues.

If you need to use multiple domains to call your endpoints, you may need to [implement CORS in your routes](https://github.com/vercel/next.js/tree/canary/examples/api-routes-cors).

## Digging Deeper

### Routing options

#### Using the pages router

If you are using the pages router, it is likely [that using the `getServerSideProps` approach](pages/index.tsx) would be the best for you.

The reason for this is that you usually want to run the domain checking code on the server, before you render your pages. This is especially true when you want to use that subdomain to further authenticate the request.

Using `getServerSideProps` allows you to create logic that you can then pass down as props to your page components. Keep in mind that `getServerSideProps` can only be used on top level pages and not inside components. If you want to localize the logic to a component, and keep that logic on the server, consider using the app router and "React Server Components".

You can check the sudomain on the client side using `window.location.hostname` or `window.location.host`. This means you need to wait for the client to render, as well as using effects, in order to check that value.

#### Using the app router (React Server Components)

When using the app router, you can run server side code in your components. This allows you to check the details of the request at the component level. This can be handy when coupled with authentication to conditional render parts of your component based on the details extrapolated from the request subdomain.

### Implications on pre-rendering

It is possible to pre-render pages that conditionally use a subdomain or would otherwise render unique content given that a subdomain is used.

To do this, you would need to dramatically reimagine your app architecture. You would need to do the following:

#### Set the `.env` to a specific client subdomain

You would need to treat your app as a multi-tenant app where the `.env` sets the tenant.

You can then run `npm run build` whilst that "tenant" is set in the env, and render the specific content for them.

#### Use the "base url" for that tenant

When you are making requests, linking pages, or linking to assets, you need to be sure to use that clients subdomain.

#### Loop through all your "clients" and render their sites

You would need to change your build step to loop through each client/subdomain in order to render their version of the site. Consider these steps:

1. Fetch the list of all the subdomains
2. For each subdomain, create an `.env` specifically for them
3. Run `npm run build`
4. Deploy that static output
5. Repeat for each client

There are a lot of variables to consider with this setup. So it is difficult to create a demo that could handle all the variants that your app may have.

Another challenge with this approach is that it is not aware of the new subdomains being added to your account. So you would need to make sure that this entire build loop is run when new subdomains are added - making this approach even more complicated.

Ideally, you can use server-side rendering to conditionally handle the requests to your app. This means using middleware, `getServerSideProps`, or the app router with React Server Components.

---

### Pages Router

#### Using middleware to handle requests

You can use middleware to capture the request before it hits your page for rendering. You can use this to prepare a request before it hits your page, block or stop requests, preform redirects, or use the domain to preform authentication.

See [middleware.ts](middleware.ts).

#### Using API routes to handle requests

If you have API endpoints in your app that need to use the domain the process is similar to middleware. You can grab the domain off the header and use that in the rest of your code.

See [pages/api/host.ts](pages/api/host.ts).

#### Using `getServerSideProps` in pages

Like the API route, you can grab the domain off the headers in the request. You can the use that as `props` in your page when it is rendering.

See [pages/index.tsx](pages/index.tsx).

#### Using client side pages

If you are in a client context and want to get the domain, you can use `window.location.hostname` or `window.location.host` as long as you wrap the logic in a state callback.

See [pages/page-csr.tsx](pages/page-csr.tsx).

### App Router

#### Using route handlers

If you are using the new `app` directory, you have access to route handlers. Like the other methods, you can pull the domain that is in the request headers.

See [app/app-hosts/route.ts](app/app-hosts/route.ts).

#### Using app pages

If you are using the new `app` directory, you can use server side functions in your pages through server components.

See [app/ssr-page/page.tsx](app/ssr-page/page.tsx).

#### Using app client side pages

If you are using the new `app` directory and want to get the domain, you can use `window.location.hostname` or `window.location.host` as long as the page uses `"use client"`.

See [app/csr-page/page.tsx](app/csr-page/page.tsx).