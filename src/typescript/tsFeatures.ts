/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// =====================================================================
type Routes = {
  "/user/:id": undefined; // нет query параметров
  "/user/:id/post/:postId": undefined;
  "/search": { query: string; page?: number };
  "/settings": { tab?: "profile" | "billing" };
  "/docs/*": undefined; // звёздочка — любой путь после /docs/
};

type ExtractParams<Path extends string> =
  Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [k in Param]: string } & ExtractParams<Rest>
    : Path extends `${infer _Start}:${infer Param}`
      ? { [k in Param]: string }
      : Path extends `${infer _Start}/*`
        ? { wildcard: string }
        : {};

// CHECK
type Params1 = ExtractParams<"/user/:id">; // { id: string }
type Params2 = ExtractParams<"/user/:id/post/:postId">; // { id: string; postId: string }
type Params3 = ExtractParams<"/search">; // {}
type Params4 = ExtractParams<"/docs/*">; // { wildcard: string }
// =====================================================================

type FullRouteParams<T extends string> = T extends keyof Routes
  ? Routes[T] extends undefined
    ? ExtractParams<T>
    : Routes[T]
  : never;

// CHECK
// T — это одна из записей Routes. Если query нет (undefined), оставить только path-параметры.
type Full1 = FullRouteParams<"/user/:id">; // { id: string }
type Full2 = FullRouteParams<"/search">; // { query: string; page?: number }
type Full3 = FullRouteParams<"/user/:id/post/:postId">; // { id: string; postId: string }
// =====================================================================

type ValidateRoute2<P> =
  P extends ExtractParams<keyof Routes>
    ? Exclude<keyof P, keyof ExtractParams<keyof Routes>> extends never
      ? Exclude<keyof ExtractParams<keyof Routes>, keyof P> extends never
        ? P
        : never
      : never
    : never;

type Exact<T, P> = T extends P
  ? Exclude<keyof T, keyof P> extends never
    ? Exclude<keyof P, keyof T> extends never
      ? T
      : never
    : never
  : never;

type NonEmpty<T> = T extends any ? (keyof T extends never ? never : T) : never;
type RouteParamsNonEmpty = NonEmpty<ExtractParams<keyof Routes>>;
type ValidateRoute<P> = RouteParamsNonEmpty extends infer R
  ? R extends any
    ? P extends R
      ? Exact<P, RouteParamsNonEmpty> extends never
        ? never
        : P
      : never
    : never
  : never;

// CHECK
// Это уже higher-order conditional type. Он проверяет, что переданный объект с параметрами не содержит лишних ключей и содержит все обязательные.
// Если всё ок → возвращает P.
// Если есть лишний ключ → вернуть never.
// Если не хватает обязательного → never.
type Valid = ValidateRoute<{ id: string }>; // { id: string } — допустим
type InvalidExtra = ValidateRoute<{ id: string; foo: string }>; // never
type InvalidMissing = ValidateRoute<{}>; // never
