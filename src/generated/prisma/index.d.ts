
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Complaint
 * 
 */
export type Complaint = $Result.DefaultSelection<Prisma.$ComplaintPayload>
/**
 * Model ComplaintUpdate
 * 
 */
export type ComplaintUpdate = $Result.DefaultSelection<Prisma.$ComplaintUpdatePayload>
/**
 * Model ComplaintAttachment
 * 
 */
export type ComplaintAttachment = $Result.DefaultSelection<Prisma.$ComplaintAttachmentPayload>
/**
 * Model ComplaintFeedback
 * 
 */
export type ComplaintFeedback = $Result.DefaultSelection<Prisma.$ComplaintFeedbackPayload>
/**
 * Model ComplaintStatusLog
 * 
 */
export type ComplaintStatusLog = $Result.DefaultSelection<Prisma.$ComplaintStatusLogPayload>
/**
 * Model NotificationPreference
 * 
 */
export type NotificationPreference = $Result.DefaultSelection<Prisma.$NotificationPreferencePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  STUDENT: 'STUDENT',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ComplaintStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED'
};

export type ComplaintStatus = (typeof ComplaintStatus)[keyof typeof ComplaintStatus]


export const ComplaintPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type ComplaintPriority = (typeof ComplaintPriority)[keyof typeof ComplaintPriority]


export const ComplaintCategory: {
  PLUMBING: 'PLUMBING',
  ELECTRICAL: 'ELECTRICAL',
  FURNITURE: 'FURNITURE',
  CLEANLINESS: 'CLEANLINESS',
  NOISE_COMPLAINT: 'NOISE_COMPLAINT',
  SECURITY: 'SECURITY',
  INTERNET: 'INTERNET',
  OTHER: 'OTHER'
};

export type ComplaintCategory = (typeof ComplaintCategory)[keyof typeof ComplaintCategory]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ComplaintStatus = $Enums.ComplaintStatus

export const ComplaintStatus: typeof $Enums.ComplaintStatus

export type ComplaintPriority = $Enums.ComplaintPriority

export const ComplaintPriority: typeof $Enums.ComplaintPriority

export type ComplaintCategory = $Enums.ComplaintCategory

export const ComplaintCategory: typeof $Enums.ComplaintCategory

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaint`: Exposes CRUD operations for the **Complaint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Complaints
    * const complaints = await prisma.complaint.findMany()
    * ```
    */
  get complaint(): Prisma.ComplaintDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaintUpdate`: Exposes CRUD operations for the **ComplaintUpdate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintUpdates
    * const complaintUpdates = await prisma.complaintUpdate.findMany()
    * ```
    */
  get complaintUpdate(): Prisma.ComplaintUpdateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaintAttachment`: Exposes CRUD operations for the **ComplaintAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintAttachments
    * const complaintAttachments = await prisma.complaintAttachment.findMany()
    * ```
    */
  get complaintAttachment(): Prisma.ComplaintAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaintFeedback`: Exposes CRUD operations for the **ComplaintFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintFeedbacks
    * const complaintFeedbacks = await prisma.complaintFeedback.findMany()
    * ```
    */
  get complaintFeedback(): Prisma.ComplaintFeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaintStatusLog`: Exposes CRUD operations for the **ComplaintStatusLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintStatusLogs
    * const complaintStatusLogs = await prisma.complaintStatusLog.findMany()
    * ```
    */
  get complaintStatusLog(): Prisma.ComplaintStatusLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationPreference`: Exposes CRUD operations for the **NotificationPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPreferences
    * const notificationPreferences = await prisma.notificationPreference.findMany()
    * ```
    */
  get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Complaint: 'Complaint',
    ComplaintUpdate: 'ComplaintUpdate',
    ComplaintAttachment: 'ComplaintAttachment',
    ComplaintFeedback: 'ComplaintFeedback',
    ComplaintStatusLog: 'ComplaintStatusLog',
    NotificationPreference: 'NotificationPreference'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "complaint" | "complaintUpdate" | "complaintAttachment" | "complaintFeedback" | "complaintStatusLog" | "notificationPreference"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Complaint: {
        payload: Prisma.$ComplaintPayload<ExtArgs>
        fields: Prisma.ComplaintFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findFirst: {
            args: Prisma.ComplaintFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findMany: {
            args: Prisma.ComplaintFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          create: {
            args: Prisma.ComplaintCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          createMany: {
            args: Prisma.ComplaintCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          delete: {
            args: Prisma.ComplaintDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          update: {
            args: Prisma.ComplaintUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaint>
          }
          groupBy: {
            args: Prisma.ComplaintGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintCountAggregateOutputType> | number
          }
        }
      }
      ComplaintUpdate: {
        payload: Prisma.$ComplaintUpdatePayload<ExtArgs>
        fields: Prisma.ComplaintUpdateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintUpdateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintUpdateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>
          }
          findFirst: {
            args: Prisma.ComplaintUpdateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintUpdateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>
          }
          findMany: {
            args: Prisma.ComplaintUpdateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>[]
          }
          create: {
            args: Prisma.ComplaintUpdateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>
          }
          createMany: {
            args: Prisma.ComplaintUpdateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintUpdateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>[]
          }
          delete: {
            args: Prisma.ComplaintUpdateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>
          }
          update: {
            args: Prisma.ComplaintUpdateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>
          }
          deleteMany: {
            args: Prisma.ComplaintUpdateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintUpdateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintUpdateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>[]
          }
          upsert: {
            args: Prisma.ComplaintUpdateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintUpdatePayload>
          }
          aggregate: {
            args: Prisma.ComplaintUpdateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintUpdate>
          }
          groupBy: {
            args: Prisma.ComplaintUpdateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintUpdateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintUpdateCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintUpdateCountAggregateOutputType> | number
          }
        }
      }
      ComplaintAttachment: {
        payload: Prisma.$ComplaintAttachmentPayload<ExtArgs>
        fields: Prisma.ComplaintAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          findFirst: {
            args: Prisma.ComplaintAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          findMany: {
            args: Prisma.ComplaintAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>[]
          }
          create: {
            args: Prisma.ComplaintAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          createMany: {
            args: Prisma.ComplaintAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>[]
          }
          delete: {
            args: Prisma.ComplaintAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          update: {
            args: Prisma.ComplaintAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintAttachment>
          }
          groupBy: {
            args: Prisma.ComplaintAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintAttachmentCountAggregateOutputType> | number
          }
        }
      }
      ComplaintFeedback: {
        payload: Prisma.$ComplaintFeedbackPayload<ExtArgs>
        fields: Prisma.ComplaintFeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintFeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintFeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>
          }
          findFirst: {
            args: Prisma.ComplaintFeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintFeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>
          }
          findMany: {
            args: Prisma.ComplaintFeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>[]
          }
          create: {
            args: Prisma.ComplaintFeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>
          }
          createMany: {
            args: Prisma.ComplaintFeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintFeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>[]
          }
          delete: {
            args: Prisma.ComplaintFeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>
          }
          update: {
            args: Prisma.ComplaintFeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintFeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintFeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintFeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintFeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintFeedbackPayload>
          }
          aggregate: {
            args: Prisma.ComplaintFeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintFeedback>
          }
          groupBy: {
            args: Prisma.ComplaintFeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintFeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintFeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintFeedbackCountAggregateOutputType> | number
          }
        }
      }
      ComplaintStatusLog: {
        payload: Prisma.$ComplaintStatusLogPayload<ExtArgs>
        fields: Prisma.ComplaintStatusLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintStatusLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintStatusLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>
          }
          findFirst: {
            args: Prisma.ComplaintStatusLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintStatusLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>
          }
          findMany: {
            args: Prisma.ComplaintStatusLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>[]
          }
          create: {
            args: Prisma.ComplaintStatusLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>
          }
          createMany: {
            args: Prisma.ComplaintStatusLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintStatusLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>[]
          }
          delete: {
            args: Prisma.ComplaintStatusLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>
          }
          update: {
            args: Prisma.ComplaintStatusLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintStatusLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintStatusLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintStatusLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintStatusLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintStatusLogPayload>
          }
          aggregate: {
            args: Prisma.ComplaintStatusLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintStatusLog>
          }
          groupBy: {
            args: Prisma.ComplaintStatusLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintStatusLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintStatusLogCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintStatusLogCountAggregateOutputType> | number
          }
        }
      }
      NotificationPreference: {
        payload: Prisma.$NotificationPreferencePayload<ExtArgs>
        fields: Prisma.NotificationPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findFirst: {
            args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findMany: {
            args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          create: {
            args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          createMany: {
            args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          delete: {
            args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          update: {
            args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          deleteMany: {
            args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          upsert: {
            args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          aggregate: {
            args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPreference>
          }
          groupBy: {
            args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    complaint?: ComplaintOmit
    complaintUpdate?: ComplaintUpdateOmit
    complaintAttachment?: ComplaintAttachmentOmit
    complaintFeedback?: ComplaintFeedbackOmit
    complaintStatusLog?: ComplaintStatusLogOmit
    notificationPreference?: NotificationPreferenceOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    complaints: number
    assignedComplaints: number
    complaintUpdates: number
    statusChanges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaints?: boolean | UserCountOutputTypeCountComplaintsArgs
    assignedComplaints?: boolean | UserCountOutputTypeCountAssignedComplaintsArgs
    complaintUpdates?: boolean | UserCountOutputTypeCountComplaintUpdatesArgs
    statusChanges?: boolean | UserCountOutputTypeCountStatusChangesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountComplaintsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedComplaintsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountComplaintUpdatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintUpdateWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatusChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintStatusLogWhereInput
  }


  /**
   * Count Type ComplaintCountOutputType
   */

  export type ComplaintCountOutputType = {
    updates: number
    attachments: number
    statusLogs: number
  }

  export type ComplaintCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    updates?: boolean | ComplaintCountOutputTypeCountUpdatesArgs
    attachments?: boolean | ComplaintCountOutputTypeCountAttachmentsArgs
    statusLogs?: boolean | ComplaintCountOutputTypeCountStatusLogsArgs
  }

  // Custom InputTypes
  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintCountOutputType
     */
    select?: ComplaintCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountUpdatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintUpdateWhereInput
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintAttachmentWhereInput
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountStatusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintStatusLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: $Enums.UserRole | null
    status: $Enums.UserStatus | null
    phone: string | null
    department: string | null
    studentId: string | null
    hostelBlock: string | null
    roomNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: $Enums.UserRole | null
    status: $Enums.UserStatus | null
    phone: string | null
    department: string | null
    studentId: string | null
    hostelBlock: string | null
    roomNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    role: number
    status: number
    phone: number
    department: number
    studentId: number
    hostelBlock: number
    roomNumber: number
    createdAt: number
    updatedAt: number
    lastLogin: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    status?: true
    phone?: true
    department?: true
    studentId?: true
    hostelBlock?: true
    roomNumber?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    status?: true
    phone?: true
    department?: true
    studentId?: true
    hostelBlock?: true
    roomNumber?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    status?: true
    phone?: true
    department?: true
    studentId?: true
    hostelBlock?: true
    roomNumber?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status: $Enums.UserStatus
    phone: string | null
    department: string | null
    studentId: string | null
    hostelBlock: string | null
    roomNumber: string | null
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    status?: boolean
    phone?: boolean
    department?: boolean
    studentId?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    complaints?: boolean | User$complaintsArgs<ExtArgs>
    assignedComplaints?: boolean | User$assignedComplaintsArgs<ExtArgs>
    complaintUpdates?: boolean | User$complaintUpdatesArgs<ExtArgs>
    notificationPreference?: boolean | User$notificationPreferenceArgs<ExtArgs>
    statusChanges?: boolean | User$statusChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    status?: boolean
    phone?: boolean
    department?: boolean
    studentId?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    status?: boolean
    phone?: boolean
    department?: boolean
    studentId?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    status?: boolean
    phone?: boolean
    department?: boolean
    studentId?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "fullName" | "role" | "status" | "phone" | "department" | "studentId" | "hostelBlock" | "roomNumber" | "createdAt" | "updatedAt" | "lastLogin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaints?: boolean | User$complaintsArgs<ExtArgs>
    assignedComplaints?: boolean | User$assignedComplaintsArgs<ExtArgs>
    complaintUpdates?: boolean | User$complaintUpdatesArgs<ExtArgs>
    notificationPreference?: boolean | User$notificationPreferenceArgs<ExtArgs>
    statusChanges?: boolean | User$statusChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      complaints: Prisma.$ComplaintPayload<ExtArgs>[]
      assignedComplaints: Prisma.$ComplaintPayload<ExtArgs>[]
      complaintUpdates: Prisma.$ComplaintUpdatePayload<ExtArgs>[]
      notificationPreference: Prisma.$NotificationPreferencePayload<ExtArgs> | null
      statusChanges: Prisma.$ComplaintStatusLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      role: $Enums.UserRole
      status: $Enums.UserStatus
      phone: string | null
      department: string | null
      studentId: string | null
      hostelBlock: string | null
      roomNumber: string | null
      createdAt: Date
      updatedAt: Date
      lastLogin: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaints<T extends User$complaintsArgs<ExtArgs> = {}>(args?: Subset<T, User$complaintsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedComplaints<T extends User$assignedComplaintsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedComplaintsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    complaintUpdates<T extends User$complaintUpdatesArgs<ExtArgs> = {}>(args?: Subset<T, User$complaintUpdatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificationPreference<T extends User$notificationPreferenceArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationPreferenceArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    statusChanges<T extends User$statusChangesArgs<ExtArgs> = {}>(args?: Subset<T, User$statusChangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly phone: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly studentId: FieldRef<"User", 'String'>
    readonly hostelBlock: FieldRef<"User", 'String'>
    readonly roomNumber: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.complaints
   */
  export type User$complaintsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    cursor?: ComplaintWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * User.assignedComplaints
   */
  export type User$assignedComplaintsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    cursor?: ComplaintWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * User.complaintUpdates
   */
  export type User$complaintUpdatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    where?: ComplaintUpdateWhereInput
    orderBy?: ComplaintUpdateOrderByWithRelationInput | ComplaintUpdateOrderByWithRelationInput[]
    cursor?: ComplaintUpdateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintUpdateScalarFieldEnum | ComplaintUpdateScalarFieldEnum[]
  }

  /**
   * User.notificationPreference
   */
  export type User$notificationPreferenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    where?: NotificationPreferenceWhereInput
  }

  /**
   * User.statusChanges
   */
  export type User$statusChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    where?: ComplaintStatusLogWhereInput
    orderBy?: ComplaintStatusLogOrderByWithRelationInput | ComplaintStatusLogOrderByWithRelationInput[]
    cursor?: ComplaintStatusLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintStatusLogScalarFieldEnum | ComplaintStatusLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Complaint
   */

  export type AggregateComplaint = {
    _count: ComplaintCountAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  export type ComplaintMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: $Enums.ComplaintCategory | null
    status: $Enums.ComplaintStatus | null
    priority: $Enums.ComplaintPriority | null
    hostelBlock: string | null
    roomNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    studentId: string | null
    assignedToId: string | null
  }

  export type ComplaintMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: $Enums.ComplaintCategory | null
    status: $Enums.ComplaintStatus | null
    priority: $Enums.ComplaintPriority | null
    hostelBlock: string | null
    roomNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    studentId: string | null
    assignedToId: string | null
  }

  export type ComplaintCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    status: number
    priority: number
    hostelBlock: number
    roomNumber: number
    createdAt: number
    updatedAt: number
    studentId: number
    assignedToId: number
    _all: number
  }


  export type ComplaintMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    status?: true
    priority?: true
    hostelBlock?: true
    roomNumber?: true
    createdAt?: true
    updatedAt?: true
    studentId?: true
    assignedToId?: true
  }

  export type ComplaintMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    status?: true
    priority?: true
    hostelBlock?: true
    roomNumber?: true
    createdAt?: true
    updatedAt?: true
    studentId?: true
    assignedToId?: true
  }

  export type ComplaintCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    status?: true
    priority?: true
    hostelBlock?: true
    roomNumber?: true
    createdAt?: true
    updatedAt?: true
    studentId?: true
    assignedToId?: true
    _all?: true
  }

  export type ComplaintAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaint to aggregate.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Complaints
    **/
    _count?: true | ComplaintCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintMaxAggregateInputType
  }

  export type GetComplaintAggregateType<T extends ComplaintAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaint[P]>
      : GetScalarType<T[P], AggregateComplaint[P]>
  }




  export type ComplaintGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithAggregationInput | ComplaintOrderByWithAggregationInput[]
    by: ComplaintScalarFieldEnum[] | ComplaintScalarFieldEnum
    having?: ComplaintScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintCountAggregateInputType | true
    _min?: ComplaintMinAggregateInputType
    _max?: ComplaintMaxAggregateInputType
  }

  export type ComplaintGroupByOutputType = {
    id: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status: $Enums.ComplaintStatus
    priority: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt: Date
    updatedAt: Date
    studentId: string
    assignedToId: string | null
    _count: ComplaintCountAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  type GetComplaintGroupByPayload<T extends ComplaintGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    priority?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    assignedToId?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Complaint$assignedToArgs<ExtArgs>
    updates?: boolean | Complaint$updatesArgs<ExtArgs>
    attachments?: boolean | Complaint$attachmentsArgs<ExtArgs>
    feedback?: boolean | Complaint$feedbackArgs<ExtArgs>
    statusLogs?: boolean | Complaint$statusLogsArgs<ExtArgs>
    _count?: boolean | ComplaintCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    priority?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    assignedToId?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Complaint$assignedToArgs<ExtArgs>
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    priority?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    assignedToId?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Complaint$assignedToArgs<ExtArgs>
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    status?: boolean
    priority?: boolean
    hostelBlock?: boolean
    roomNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    assignedToId?: boolean
  }

  export type ComplaintOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "status" | "priority" | "hostelBlock" | "roomNumber" | "createdAt" | "updatedAt" | "studentId" | "assignedToId", ExtArgs["result"]["complaint"]>
  export type ComplaintInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Complaint$assignedToArgs<ExtArgs>
    updates?: boolean | Complaint$updatesArgs<ExtArgs>
    attachments?: boolean | Complaint$attachmentsArgs<ExtArgs>
    feedback?: boolean | Complaint$feedbackArgs<ExtArgs>
    statusLogs?: boolean | Complaint$statusLogsArgs<ExtArgs>
    _count?: boolean | ComplaintCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComplaintIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Complaint$assignedToArgs<ExtArgs>
  }
  export type ComplaintIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Complaint$assignedToArgs<ExtArgs>
  }

  export type $ComplaintPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Complaint"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
      updates: Prisma.$ComplaintUpdatePayload<ExtArgs>[]
      attachments: Prisma.$ComplaintAttachmentPayload<ExtArgs>[]
      feedback: Prisma.$ComplaintFeedbackPayload<ExtArgs> | null
      statusLogs: Prisma.$ComplaintStatusLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      category: $Enums.ComplaintCategory
      status: $Enums.ComplaintStatus
      priority: $Enums.ComplaintPriority
      hostelBlock: string
      roomNumber: string
      createdAt: Date
      updatedAt: Date
      studentId: string
      assignedToId: string | null
    }, ExtArgs["result"]["complaint"]>
    composites: {}
  }

  type ComplaintGetPayload<S extends boolean | null | undefined | ComplaintDefaultArgs> = $Result.GetResult<Prisma.$ComplaintPayload, S>

  type ComplaintCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintCountAggregateInputType | true
    }

  export interface ComplaintDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Complaint'], meta: { name: 'Complaint' } }
    /**
     * Find zero or one Complaint that matches the filter.
     * @param {ComplaintFindUniqueArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintFindUniqueArgs>(args: SelectSubset<T, ComplaintFindUniqueArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Complaint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintFindUniqueOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Complaint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintFindFirstArgs>(args?: SelectSubset<T, ComplaintFindFirstArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Complaint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Complaints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Complaints
     * const complaints = await prisma.complaint.findMany()
     * 
     * // Get first 10 Complaints
     * const complaints = await prisma.complaint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintWithIdOnly = await prisma.complaint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintFindManyArgs>(args?: SelectSubset<T, ComplaintFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Complaint.
     * @param {ComplaintCreateArgs} args - Arguments to create a Complaint.
     * @example
     * // Create one Complaint
     * const Complaint = await prisma.complaint.create({
     *   data: {
     *     // ... data to create a Complaint
     *   }
     * })
     * 
     */
    create<T extends ComplaintCreateArgs>(args: SelectSubset<T, ComplaintCreateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Complaints.
     * @param {ComplaintCreateManyArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintCreateManyArgs>(args?: SelectSubset<T, ComplaintCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Complaints and returns the data saved in the database.
     * @param {ComplaintCreateManyAndReturnArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Complaint.
     * @param {ComplaintDeleteArgs} args - Arguments to delete one Complaint.
     * @example
     * // Delete one Complaint
     * const Complaint = await prisma.complaint.delete({
     *   where: {
     *     // ... filter to delete one Complaint
     *   }
     * })
     * 
     */
    delete<T extends ComplaintDeleteArgs>(args: SelectSubset<T, ComplaintDeleteArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Complaint.
     * @param {ComplaintUpdateArgs} args - Arguments to update one Complaint.
     * @example
     * // Update one Complaint
     * const complaint = await prisma.complaint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintUpdateArgs>(args: SelectSubset<T, ComplaintUpdateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Complaints.
     * @param {ComplaintDeleteManyArgs} args - Arguments to filter Complaints to delete.
     * @example
     * // Delete a few Complaints
     * const { count } = await prisma.complaint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintDeleteManyArgs>(args?: SelectSubset<T, ComplaintDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintUpdateManyArgs>(args: SelectSubset<T, ComplaintUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints and returns the data updated in the database.
     * @param {ComplaintUpdateManyAndReturnArgs} args - Arguments to update many Complaints.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Complaint.
     * @param {ComplaintUpsertArgs} args - Arguments to update or create a Complaint.
     * @example
     * // Update or create a Complaint
     * const complaint = await prisma.complaint.upsert({
     *   create: {
     *     // ... data to create a Complaint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Complaint we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintUpsertArgs>(args: SelectSubset<T, ComplaintUpsertArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintCountArgs} args - Arguments to filter Complaints to count.
     * @example
     * // Count the number of Complaints
     * const count = await prisma.complaint.count({
     *   where: {
     *     // ... the filter for the Complaints we want to count
     *   }
     * })
    **/
    count<T extends ComplaintCountArgs>(
      args?: Subset<T, ComplaintCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintAggregateArgs>(args: Subset<T, ComplaintAggregateArgs>): Prisma.PrismaPromise<GetComplaintAggregateType<T>>

    /**
     * Group by Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Complaint model
   */
  readonly fields: ComplaintFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Complaint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedTo<T extends Complaint$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    updates<T extends Complaint$updatesArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$updatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Complaint$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedback<T extends Complaint$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$feedbackArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    statusLogs<T extends Complaint$statusLogsArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$statusLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Complaint model
   */
  interface ComplaintFieldRefs {
    readonly id: FieldRef<"Complaint", 'String'>
    readonly title: FieldRef<"Complaint", 'String'>
    readonly description: FieldRef<"Complaint", 'String'>
    readonly category: FieldRef<"Complaint", 'ComplaintCategory'>
    readonly status: FieldRef<"Complaint", 'ComplaintStatus'>
    readonly priority: FieldRef<"Complaint", 'ComplaintPriority'>
    readonly hostelBlock: FieldRef<"Complaint", 'String'>
    readonly roomNumber: FieldRef<"Complaint", 'String'>
    readonly createdAt: FieldRef<"Complaint", 'DateTime'>
    readonly updatedAt: FieldRef<"Complaint", 'DateTime'>
    readonly studentId: FieldRef<"Complaint", 'String'>
    readonly assignedToId: FieldRef<"Complaint", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Complaint findUnique
   */
  export type ComplaintFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findUniqueOrThrow
   */
  export type ComplaintFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findFirst
   */
  export type ComplaintFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findFirstOrThrow
   */
  export type ComplaintFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findMany
   */
  export type ComplaintFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaints to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint create
   */
  export type ComplaintCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The data needed to create a Complaint.
     */
    data: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
  }

  /**
   * Complaint createMany
   */
  export type ComplaintCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Complaint createManyAndReturn
   */
  export type ComplaintCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Complaint update
   */
  export type ComplaintUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The data needed to update a Complaint.
     */
    data: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
    /**
     * Choose, which Complaint to update.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint updateMany
   */
  export type ComplaintUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to update.
     */
    limit?: number
  }

  /**
   * Complaint updateManyAndReturn
   */
  export type ComplaintUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Complaint upsert
   */
  export type ComplaintUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The filter to search for the Complaint to update in case it exists.
     */
    where: ComplaintWhereUniqueInput
    /**
     * In case the Complaint found by the `where` argument doesn't exist, create a new Complaint with this data.
     */
    create: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
    /**
     * In case the Complaint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
  }

  /**
   * Complaint delete
   */
  export type ComplaintDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter which Complaint to delete.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint deleteMany
   */
  export type ComplaintDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaints to delete
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to delete.
     */
    limit?: number
  }

  /**
   * Complaint.assignedTo
   */
  export type Complaint$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Complaint.updates
   */
  export type Complaint$updatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    where?: ComplaintUpdateWhereInput
    orderBy?: ComplaintUpdateOrderByWithRelationInput | ComplaintUpdateOrderByWithRelationInput[]
    cursor?: ComplaintUpdateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintUpdateScalarFieldEnum | ComplaintUpdateScalarFieldEnum[]
  }

  /**
   * Complaint.attachments
   */
  export type Complaint$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    where?: ComplaintAttachmentWhereInput
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    cursor?: ComplaintAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * Complaint.feedback
   */
  export type Complaint$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    where?: ComplaintFeedbackWhereInput
  }

  /**
   * Complaint.statusLogs
   */
  export type Complaint$statusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    where?: ComplaintStatusLogWhereInput
    orderBy?: ComplaintStatusLogOrderByWithRelationInput | ComplaintStatusLogOrderByWithRelationInput[]
    cursor?: ComplaintStatusLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintStatusLogScalarFieldEnum | ComplaintStatusLogScalarFieldEnum[]
  }

  /**
   * Complaint without action
   */
  export type ComplaintDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintUpdate
   */

  export type AggregateComplaintUpdate = {
    _count: ComplaintUpdateCountAggregateOutputType | null
    _min: ComplaintUpdateMinAggregateOutputType | null
    _max: ComplaintUpdateMaxAggregateOutputType | null
  }

  export type ComplaintUpdateMinAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
    complaintId: string | null
    staffId: string | null
  }

  export type ComplaintUpdateMaxAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
    complaintId: string | null
    staffId: string | null
  }

  export type ComplaintUpdateCountAggregateOutputType = {
    id: number
    message: number
    createdAt: number
    complaintId: number
    staffId: number
    _all: number
  }


  export type ComplaintUpdateMinAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    complaintId?: true
    staffId?: true
  }

  export type ComplaintUpdateMaxAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    complaintId?: true
    staffId?: true
  }

  export type ComplaintUpdateCountAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    complaintId?: true
    staffId?: true
    _all?: true
  }

  export type ComplaintUpdateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintUpdate to aggregate.
     */
    where?: ComplaintUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintUpdates to fetch.
     */
    orderBy?: ComplaintUpdateOrderByWithRelationInput | ComplaintUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintUpdates
    **/
    _count?: true | ComplaintUpdateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintUpdateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintUpdateMaxAggregateInputType
  }

  export type GetComplaintUpdateAggregateType<T extends ComplaintUpdateAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintUpdate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintUpdate[P]>
      : GetScalarType<T[P], AggregateComplaintUpdate[P]>
  }




  export type ComplaintUpdateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintUpdateWhereInput
    orderBy?: ComplaintUpdateOrderByWithAggregationInput | ComplaintUpdateOrderByWithAggregationInput[]
    by: ComplaintUpdateScalarFieldEnum[] | ComplaintUpdateScalarFieldEnum
    having?: ComplaintUpdateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintUpdateCountAggregateInputType | true
    _min?: ComplaintUpdateMinAggregateInputType
    _max?: ComplaintUpdateMaxAggregateInputType
  }

  export type ComplaintUpdateGroupByOutputType = {
    id: string
    message: string
    createdAt: Date
    complaintId: string
    staffId: string | null
    _count: ComplaintUpdateCountAggregateOutputType | null
    _min: ComplaintUpdateMinAggregateOutputType | null
    _max: ComplaintUpdateMaxAggregateOutputType | null
  }

  type GetComplaintUpdateGroupByPayload<T extends ComplaintUpdateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintUpdateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintUpdateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintUpdateGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintUpdateGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintUpdateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
    complaintId?: boolean
    staffId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    staff?: boolean | ComplaintUpdate$staffArgs<ExtArgs>
  }, ExtArgs["result"]["complaintUpdate"]>

  export type ComplaintUpdateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
    complaintId?: boolean
    staffId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    staff?: boolean | ComplaintUpdate$staffArgs<ExtArgs>
  }, ExtArgs["result"]["complaintUpdate"]>

  export type ComplaintUpdateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
    complaintId?: boolean
    staffId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    staff?: boolean | ComplaintUpdate$staffArgs<ExtArgs>
  }, ExtArgs["result"]["complaintUpdate"]>

  export type ComplaintUpdateSelectScalar = {
    id?: boolean
    message?: boolean
    createdAt?: boolean
    complaintId?: boolean
    staffId?: boolean
  }

  export type ComplaintUpdateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "createdAt" | "complaintId" | "staffId", ExtArgs["result"]["complaintUpdate"]>
  export type ComplaintUpdateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    staff?: boolean | ComplaintUpdate$staffArgs<ExtArgs>
  }
  export type ComplaintUpdateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    staff?: boolean | ComplaintUpdate$staffArgs<ExtArgs>
  }
  export type ComplaintUpdateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    staff?: boolean | ComplaintUpdate$staffArgs<ExtArgs>
  }

  export type $ComplaintUpdatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintUpdate"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
      staff: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      createdAt: Date
      complaintId: string
      staffId: string | null
    }, ExtArgs["result"]["complaintUpdate"]>
    composites: {}
  }

  type ComplaintUpdateGetPayload<S extends boolean | null | undefined | ComplaintUpdateDefaultArgs> = $Result.GetResult<Prisma.$ComplaintUpdatePayload, S>

  type ComplaintUpdateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintUpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintUpdateCountAggregateInputType | true
    }

  export interface ComplaintUpdateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintUpdate'], meta: { name: 'ComplaintUpdate' } }
    /**
     * Find zero or one ComplaintUpdate that matches the filter.
     * @param {ComplaintUpdateFindUniqueArgs} args - Arguments to find a ComplaintUpdate
     * @example
     * // Get one ComplaintUpdate
     * const complaintUpdate = await prisma.complaintUpdate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintUpdateFindUniqueArgs>(args: SelectSubset<T, ComplaintUpdateFindUniqueArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplaintUpdate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintUpdateFindUniqueOrThrowArgs} args - Arguments to find a ComplaintUpdate
     * @example
     * // Get one ComplaintUpdate
     * const complaintUpdate = await prisma.complaintUpdate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintUpdateFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintUpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintUpdate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateFindFirstArgs} args - Arguments to find a ComplaintUpdate
     * @example
     * // Get one ComplaintUpdate
     * const complaintUpdate = await prisma.complaintUpdate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintUpdateFindFirstArgs>(args?: SelectSubset<T, ComplaintUpdateFindFirstArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintUpdate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateFindFirstOrThrowArgs} args - Arguments to find a ComplaintUpdate
     * @example
     * // Get one ComplaintUpdate
     * const complaintUpdate = await prisma.complaintUpdate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintUpdateFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintUpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplaintUpdates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintUpdates
     * const complaintUpdates = await prisma.complaintUpdate.findMany()
     * 
     * // Get first 10 ComplaintUpdates
     * const complaintUpdates = await prisma.complaintUpdate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintUpdateWithIdOnly = await prisma.complaintUpdate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintUpdateFindManyArgs>(args?: SelectSubset<T, ComplaintUpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplaintUpdate.
     * @param {ComplaintUpdateCreateArgs} args - Arguments to create a ComplaintUpdate.
     * @example
     * // Create one ComplaintUpdate
     * const ComplaintUpdate = await prisma.complaintUpdate.create({
     *   data: {
     *     // ... data to create a ComplaintUpdate
     *   }
     * })
     * 
     */
    create<T extends ComplaintUpdateCreateArgs>(args: SelectSubset<T, ComplaintUpdateCreateArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplaintUpdates.
     * @param {ComplaintUpdateCreateManyArgs} args - Arguments to create many ComplaintUpdates.
     * @example
     * // Create many ComplaintUpdates
     * const complaintUpdate = await prisma.complaintUpdate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintUpdateCreateManyArgs>(args?: SelectSubset<T, ComplaintUpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintUpdates and returns the data saved in the database.
     * @param {ComplaintUpdateCreateManyAndReturnArgs} args - Arguments to create many ComplaintUpdates.
     * @example
     * // Create many ComplaintUpdates
     * const complaintUpdate = await prisma.complaintUpdate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintUpdates and only return the `id`
     * const complaintUpdateWithIdOnly = await prisma.complaintUpdate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintUpdateCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintUpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplaintUpdate.
     * @param {ComplaintUpdateDeleteArgs} args - Arguments to delete one ComplaintUpdate.
     * @example
     * // Delete one ComplaintUpdate
     * const ComplaintUpdate = await prisma.complaintUpdate.delete({
     *   where: {
     *     // ... filter to delete one ComplaintUpdate
     *   }
     * })
     * 
     */
    delete<T extends ComplaintUpdateDeleteArgs>(args: SelectSubset<T, ComplaintUpdateDeleteArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplaintUpdate.
     * @param {ComplaintUpdateUpdateArgs} args - Arguments to update one ComplaintUpdate.
     * @example
     * // Update one ComplaintUpdate
     * const complaintUpdate = await prisma.complaintUpdate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintUpdateUpdateArgs>(args: SelectSubset<T, ComplaintUpdateUpdateArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplaintUpdates.
     * @param {ComplaintUpdateDeleteManyArgs} args - Arguments to filter ComplaintUpdates to delete.
     * @example
     * // Delete a few ComplaintUpdates
     * const { count } = await prisma.complaintUpdate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintUpdateDeleteManyArgs>(args?: SelectSubset<T, ComplaintUpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintUpdates
     * const complaintUpdate = await prisma.complaintUpdate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintUpdateUpdateManyArgs>(args: SelectSubset<T, ComplaintUpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintUpdates and returns the data updated in the database.
     * @param {ComplaintUpdateUpdateManyAndReturnArgs} args - Arguments to update many ComplaintUpdates.
     * @example
     * // Update many ComplaintUpdates
     * const complaintUpdate = await prisma.complaintUpdate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplaintUpdates and only return the `id`
     * const complaintUpdateWithIdOnly = await prisma.complaintUpdate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintUpdateUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintUpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplaintUpdate.
     * @param {ComplaintUpdateUpsertArgs} args - Arguments to update or create a ComplaintUpdate.
     * @example
     * // Update or create a ComplaintUpdate
     * const complaintUpdate = await prisma.complaintUpdate.upsert({
     *   create: {
     *     // ... data to create a ComplaintUpdate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintUpdate we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintUpdateUpsertArgs>(args: SelectSubset<T, ComplaintUpdateUpsertArgs<ExtArgs>>): Prisma__ComplaintUpdateClient<$Result.GetResult<Prisma.$ComplaintUpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplaintUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateCountArgs} args - Arguments to filter ComplaintUpdates to count.
     * @example
     * // Count the number of ComplaintUpdates
     * const count = await prisma.complaintUpdate.count({
     *   where: {
     *     // ... the filter for the ComplaintUpdates we want to count
     *   }
     * })
    **/
    count<T extends ComplaintUpdateCountArgs>(
      args?: Subset<T, ComplaintUpdateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintUpdateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintUpdateAggregateArgs>(args: Subset<T, ComplaintUpdateAggregateArgs>): Prisma.PrismaPromise<GetComplaintUpdateAggregateType<T>>

    /**
     * Group by ComplaintUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintUpdateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintUpdateGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintUpdateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintUpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintUpdate model
   */
  readonly fields: ComplaintUpdateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintUpdate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintUpdateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    staff<T extends ComplaintUpdate$staffArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintUpdate$staffArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintUpdate model
   */
  interface ComplaintUpdateFieldRefs {
    readonly id: FieldRef<"ComplaintUpdate", 'String'>
    readonly message: FieldRef<"ComplaintUpdate", 'String'>
    readonly createdAt: FieldRef<"ComplaintUpdate", 'DateTime'>
    readonly complaintId: FieldRef<"ComplaintUpdate", 'String'>
    readonly staffId: FieldRef<"ComplaintUpdate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintUpdate findUnique
   */
  export type ComplaintUpdateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintUpdate to fetch.
     */
    where: ComplaintUpdateWhereUniqueInput
  }

  /**
   * ComplaintUpdate findUniqueOrThrow
   */
  export type ComplaintUpdateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintUpdate to fetch.
     */
    where: ComplaintUpdateWhereUniqueInput
  }

  /**
   * ComplaintUpdate findFirst
   */
  export type ComplaintUpdateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintUpdate to fetch.
     */
    where?: ComplaintUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintUpdates to fetch.
     */
    orderBy?: ComplaintUpdateOrderByWithRelationInput | ComplaintUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintUpdates.
     */
    cursor?: ComplaintUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintUpdates.
     */
    distinct?: ComplaintUpdateScalarFieldEnum | ComplaintUpdateScalarFieldEnum[]
  }

  /**
   * ComplaintUpdate findFirstOrThrow
   */
  export type ComplaintUpdateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintUpdate to fetch.
     */
    where?: ComplaintUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintUpdates to fetch.
     */
    orderBy?: ComplaintUpdateOrderByWithRelationInput | ComplaintUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintUpdates.
     */
    cursor?: ComplaintUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintUpdates.
     */
    distinct?: ComplaintUpdateScalarFieldEnum | ComplaintUpdateScalarFieldEnum[]
  }

  /**
   * ComplaintUpdate findMany
   */
  export type ComplaintUpdateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintUpdates to fetch.
     */
    where?: ComplaintUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintUpdates to fetch.
     */
    orderBy?: ComplaintUpdateOrderByWithRelationInput | ComplaintUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintUpdates.
     */
    cursor?: ComplaintUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintUpdates.
     */
    skip?: number
    distinct?: ComplaintUpdateScalarFieldEnum | ComplaintUpdateScalarFieldEnum[]
  }

  /**
   * ComplaintUpdate create
   */
  export type ComplaintUpdateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintUpdate.
     */
    data: XOR<ComplaintUpdateCreateInput, ComplaintUpdateUncheckedCreateInput>
  }

  /**
   * ComplaintUpdate createMany
   */
  export type ComplaintUpdateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintUpdates.
     */
    data: ComplaintUpdateCreateManyInput | ComplaintUpdateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplaintUpdate createManyAndReturn
   */
  export type ComplaintUpdateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * The data used to create many ComplaintUpdates.
     */
    data: ComplaintUpdateCreateManyInput | ComplaintUpdateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintUpdate update
   */
  export type ComplaintUpdateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintUpdate.
     */
    data: XOR<ComplaintUpdateUpdateInput, ComplaintUpdateUncheckedUpdateInput>
    /**
     * Choose, which ComplaintUpdate to update.
     */
    where: ComplaintUpdateWhereUniqueInput
  }

  /**
   * ComplaintUpdate updateMany
   */
  export type ComplaintUpdateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintUpdates.
     */
    data: XOR<ComplaintUpdateUpdateManyMutationInput, ComplaintUpdateUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintUpdates to update
     */
    where?: ComplaintUpdateWhereInput
    /**
     * Limit how many ComplaintUpdates to update.
     */
    limit?: number
  }

  /**
   * ComplaintUpdate updateManyAndReturn
   */
  export type ComplaintUpdateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * The data used to update ComplaintUpdates.
     */
    data: XOR<ComplaintUpdateUpdateManyMutationInput, ComplaintUpdateUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintUpdates to update
     */
    where?: ComplaintUpdateWhereInput
    /**
     * Limit how many ComplaintUpdates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintUpdate upsert
   */
  export type ComplaintUpdateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintUpdate to update in case it exists.
     */
    where: ComplaintUpdateWhereUniqueInput
    /**
     * In case the ComplaintUpdate found by the `where` argument doesn't exist, create a new ComplaintUpdate with this data.
     */
    create: XOR<ComplaintUpdateCreateInput, ComplaintUpdateUncheckedCreateInput>
    /**
     * In case the ComplaintUpdate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintUpdateUpdateInput, ComplaintUpdateUncheckedUpdateInput>
  }

  /**
   * ComplaintUpdate delete
   */
  export type ComplaintUpdateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
    /**
     * Filter which ComplaintUpdate to delete.
     */
    where: ComplaintUpdateWhereUniqueInput
  }

  /**
   * ComplaintUpdate deleteMany
   */
  export type ComplaintUpdateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintUpdates to delete
     */
    where?: ComplaintUpdateWhereInput
    /**
     * Limit how many ComplaintUpdates to delete.
     */
    limit?: number
  }

  /**
   * ComplaintUpdate.staff
   */
  export type ComplaintUpdate$staffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ComplaintUpdate without action
   */
  export type ComplaintUpdateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintUpdate
     */
    select?: ComplaintUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintUpdate
     */
    omit?: ComplaintUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintUpdateInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintAttachment
   */

  export type AggregateComplaintAttachment = {
    _count: ComplaintAttachmentCountAggregateOutputType | null
    _avg: ComplaintAttachmentAvgAggregateOutputType | null
    _sum: ComplaintAttachmentSumAggregateOutputType | null
    _min: ComplaintAttachmentMinAggregateOutputType | null
    _max: ComplaintAttachmentMaxAggregateOutputType | null
  }

  export type ComplaintAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type ComplaintAttachmentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type ComplaintAttachmentMinAggregateOutputType = {
    id: string | null
    fileUrl: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    createdAt: Date | null
    complaintId: string | null
  }

  export type ComplaintAttachmentMaxAggregateOutputType = {
    id: string | null
    fileUrl: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    createdAt: Date | null
    complaintId: string | null
  }

  export type ComplaintAttachmentCountAggregateOutputType = {
    id: number
    fileUrl: number
    fileName: number
    fileType: number
    fileSize: number
    createdAt: number
    complaintId: number
    _all: number
  }


  export type ComplaintAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type ComplaintAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type ComplaintAttachmentMinAggregateInputType = {
    id?: true
    fileUrl?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    createdAt?: true
    complaintId?: true
  }

  export type ComplaintAttachmentMaxAggregateInputType = {
    id?: true
    fileUrl?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    createdAt?: true
    complaintId?: true
  }

  export type ComplaintAttachmentCountAggregateInputType = {
    id?: true
    fileUrl?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    createdAt?: true
    complaintId?: true
    _all?: true
  }

  export type ComplaintAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintAttachment to aggregate.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintAttachments
    **/
    _count?: true | ComplaintAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplaintAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplaintAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintAttachmentMaxAggregateInputType
  }

  export type GetComplaintAttachmentAggregateType<T extends ComplaintAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintAttachment[P]>
      : GetScalarType<T[P], AggregateComplaintAttachment[P]>
  }




  export type ComplaintAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintAttachmentWhereInput
    orderBy?: ComplaintAttachmentOrderByWithAggregationInput | ComplaintAttachmentOrderByWithAggregationInput[]
    by: ComplaintAttachmentScalarFieldEnum[] | ComplaintAttachmentScalarFieldEnum
    having?: ComplaintAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintAttachmentCountAggregateInputType | true
    _avg?: ComplaintAttachmentAvgAggregateInputType
    _sum?: ComplaintAttachmentSumAggregateInputType
    _min?: ComplaintAttachmentMinAggregateInputType
    _max?: ComplaintAttachmentMaxAggregateInputType
  }

  export type ComplaintAttachmentGroupByOutputType = {
    id: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt: Date
    complaintId: string
    _count: ComplaintAttachmentCountAggregateOutputType | null
    _avg: ComplaintAttachmentAvgAggregateOutputType | null
    _sum: ComplaintAttachmentSumAggregateOutputType | null
    _min: ComplaintAttachmentMinAggregateOutputType | null
    _max: ComplaintAttachmentMaxAggregateOutputType | null
  }

  type GetComplaintAttachmentGroupByPayload<T extends ComplaintAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileUrl?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    complaintId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintAttachment"]>

  export type ComplaintAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileUrl?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    complaintId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintAttachment"]>

  export type ComplaintAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileUrl?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    complaintId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintAttachment"]>

  export type ComplaintAttachmentSelectScalar = {
    id?: boolean
    fileUrl?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    complaintId?: boolean
  }

  export type ComplaintAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileUrl" | "fileName" | "fileType" | "fileSize" | "createdAt" | "complaintId", ExtArgs["result"]["complaintAttachment"]>
  export type ComplaintAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $ComplaintAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintAttachment"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileUrl: string
      fileName: string
      fileType: string
      fileSize: number
      createdAt: Date
      complaintId: string
    }, ExtArgs["result"]["complaintAttachment"]>
    composites: {}
  }

  type ComplaintAttachmentGetPayload<S extends boolean | null | undefined | ComplaintAttachmentDefaultArgs> = $Result.GetResult<Prisma.$ComplaintAttachmentPayload, S>

  type ComplaintAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintAttachmentCountAggregateInputType | true
    }

  export interface ComplaintAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintAttachment'], meta: { name: 'ComplaintAttachment' } }
    /**
     * Find zero or one ComplaintAttachment that matches the filter.
     * @param {ComplaintAttachmentFindUniqueArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintAttachmentFindUniqueArgs>(args: SelectSubset<T, ComplaintAttachmentFindUniqueArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplaintAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintAttachmentFindUniqueOrThrowArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentFindFirstArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintAttachmentFindFirstArgs>(args?: SelectSubset<T, ComplaintAttachmentFindFirstArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentFindFirstOrThrowArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplaintAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintAttachments
     * const complaintAttachments = await prisma.complaintAttachment.findMany()
     * 
     * // Get first 10 ComplaintAttachments
     * const complaintAttachments = await prisma.complaintAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintAttachmentWithIdOnly = await prisma.complaintAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintAttachmentFindManyArgs>(args?: SelectSubset<T, ComplaintAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplaintAttachment.
     * @param {ComplaintAttachmentCreateArgs} args - Arguments to create a ComplaintAttachment.
     * @example
     * // Create one ComplaintAttachment
     * const ComplaintAttachment = await prisma.complaintAttachment.create({
     *   data: {
     *     // ... data to create a ComplaintAttachment
     *   }
     * })
     * 
     */
    create<T extends ComplaintAttachmentCreateArgs>(args: SelectSubset<T, ComplaintAttachmentCreateArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplaintAttachments.
     * @param {ComplaintAttachmentCreateManyArgs} args - Arguments to create many ComplaintAttachments.
     * @example
     * // Create many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintAttachmentCreateManyArgs>(args?: SelectSubset<T, ComplaintAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintAttachments and returns the data saved in the database.
     * @param {ComplaintAttachmentCreateManyAndReturnArgs} args - Arguments to create many ComplaintAttachments.
     * @example
     * // Create many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintAttachments and only return the `id`
     * const complaintAttachmentWithIdOnly = await prisma.complaintAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplaintAttachment.
     * @param {ComplaintAttachmentDeleteArgs} args - Arguments to delete one ComplaintAttachment.
     * @example
     * // Delete one ComplaintAttachment
     * const ComplaintAttachment = await prisma.complaintAttachment.delete({
     *   where: {
     *     // ... filter to delete one ComplaintAttachment
     *   }
     * })
     * 
     */
    delete<T extends ComplaintAttachmentDeleteArgs>(args: SelectSubset<T, ComplaintAttachmentDeleteArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplaintAttachment.
     * @param {ComplaintAttachmentUpdateArgs} args - Arguments to update one ComplaintAttachment.
     * @example
     * // Update one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintAttachmentUpdateArgs>(args: SelectSubset<T, ComplaintAttachmentUpdateArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplaintAttachments.
     * @param {ComplaintAttachmentDeleteManyArgs} args - Arguments to filter ComplaintAttachments to delete.
     * @example
     * // Delete a few ComplaintAttachments
     * const { count } = await prisma.complaintAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintAttachmentDeleteManyArgs>(args?: SelectSubset<T, ComplaintAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintAttachmentUpdateManyArgs>(args: SelectSubset<T, ComplaintAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintAttachments and returns the data updated in the database.
     * @param {ComplaintAttachmentUpdateManyAndReturnArgs} args - Arguments to update many ComplaintAttachments.
     * @example
     * // Update many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplaintAttachments and only return the `id`
     * const complaintAttachmentWithIdOnly = await prisma.complaintAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplaintAttachment.
     * @param {ComplaintAttachmentUpsertArgs} args - Arguments to update or create a ComplaintAttachment.
     * @example
     * // Update or create a ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.upsert({
     *   create: {
     *     // ... data to create a ComplaintAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintAttachment we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintAttachmentUpsertArgs>(args: SelectSubset<T, ComplaintAttachmentUpsertArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplaintAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentCountArgs} args - Arguments to filter ComplaintAttachments to count.
     * @example
     * // Count the number of ComplaintAttachments
     * const count = await prisma.complaintAttachment.count({
     *   where: {
     *     // ... the filter for the ComplaintAttachments we want to count
     *   }
     * })
    **/
    count<T extends ComplaintAttachmentCountArgs>(
      args?: Subset<T, ComplaintAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintAttachmentAggregateArgs>(args: Subset<T, ComplaintAttachmentAggregateArgs>): Prisma.PrismaPromise<GetComplaintAttachmentAggregateType<T>>

    /**
     * Group by ComplaintAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintAttachment model
   */
  readonly fields: ComplaintAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintAttachment model
   */
  interface ComplaintAttachmentFieldRefs {
    readonly id: FieldRef<"ComplaintAttachment", 'String'>
    readonly fileUrl: FieldRef<"ComplaintAttachment", 'String'>
    readonly fileName: FieldRef<"ComplaintAttachment", 'String'>
    readonly fileType: FieldRef<"ComplaintAttachment", 'String'>
    readonly fileSize: FieldRef<"ComplaintAttachment", 'Int'>
    readonly createdAt: FieldRef<"ComplaintAttachment", 'DateTime'>
    readonly complaintId: FieldRef<"ComplaintAttachment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintAttachment findUnique
   */
  export type ComplaintAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment findUniqueOrThrow
   */
  export type ComplaintAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment findFirst
   */
  export type ComplaintAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintAttachments.
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintAttachments.
     */
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * ComplaintAttachment findFirstOrThrow
   */
  export type ComplaintAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintAttachments.
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintAttachments.
     */
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * ComplaintAttachment findMany
   */
  export type ComplaintAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachments to fetch.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintAttachments.
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * ComplaintAttachment create
   */
  export type ComplaintAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintAttachment.
     */
    data: XOR<ComplaintAttachmentCreateInput, ComplaintAttachmentUncheckedCreateInput>
  }

  /**
   * ComplaintAttachment createMany
   */
  export type ComplaintAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintAttachments.
     */
    data: ComplaintAttachmentCreateManyInput | ComplaintAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplaintAttachment createManyAndReturn
   */
  export type ComplaintAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many ComplaintAttachments.
     */
    data: ComplaintAttachmentCreateManyInput | ComplaintAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintAttachment update
   */
  export type ComplaintAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintAttachment.
     */
    data: XOR<ComplaintAttachmentUpdateInput, ComplaintAttachmentUncheckedUpdateInput>
    /**
     * Choose, which ComplaintAttachment to update.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment updateMany
   */
  export type ComplaintAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintAttachments.
     */
    data: XOR<ComplaintAttachmentUpdateManyMutationInput, ComplaintAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintAttachments to update
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * Limit how many ComplaintAttachments to update.
     */
    limit?: number
  }

  /**
   * ComplaintAttachment updateManyAndReturn
   */
  export type ComplaintAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update ComplaintAttachments.
     */
    data: XOR<ComplaintAttachmentUpdateManyMutationInput, ComplaintAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintAttachments to update
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * Limit how many ComplaintAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintAttachment upsert
   */
  export type ComplaintAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintAttachment to update in case it exists.
     */
    where: ComplaintAttachmentWhereUniqueInput
    /**
     * In case the ComplaintAttachment found by the `where` argument doesn't exist, create a new ComplaintAttachment with this data.
     */
    create: XOR<ComplaintAttachmentCreateInput, ComplaintAttachmentUncheckedCreateInput>
    /**
     * In case the ComplaintAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintAttachmentUpdateInput, ComplaintAttachmentUncheckedUpdateInput>
  }

  /**
   * ComplaintAttachment delete
   */
  export type ComplaintAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter which ComplaintAttachment to delete.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment deleteMany
   */
  export type ComplaintAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintAttachments to delete
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * Limit how many ComplaintAttachments to delete.
     */
    limit?: number
  }

  /**
   * ComplaintAttachment without action
   */
  export type ComplaintAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintFeedback
   */

  export type AggregateComplaintFeedback = {
    _count: ComplaintFeedbackCountAggregateOutputType | null
    _avg: ComplaintFeedbackAvgAggregateOutputType | null
    _sum: ComplaintFeedbackSumAggregateOutputType | null
    _min: ComplaintFeedbackMinAggregateOutputType | null
    _max: ComplaintFeedbackMaxAggregateOutputType | null
  }

  export type ComplaintFeedbackAvgAggregateOutputType = {
    rating: number | null
  }

  export type ComplaintFeedbackSumAggregateOutputType = {
    rating: number | null
  }

  export type ComplaintFeedbackMinAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    complaintId: string | null
  }

  export type ComplaintFeedbackMaxAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    complaintId: string | null
  }

  export type ComplaintFeedbackCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    createdAt: number
    complaintId: number
    _all: number
  }


  export type ComplaintFeedbackAvgAggregateInputType = {
    rating?: true
  }

  export type ComplaintFeedbackSumAggregateInputType = {
    rating?: true
  }

  export type ComplaintFeedbackMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    complaintId?: true
  }

  export type ComplaintFeedbackMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    complaintId?: true
  }

  export type ComplaintFeedbackCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    complaintId?: true
    _all?: true
  }

  export type ComplaintFeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintFeedback to aggregate.
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintFeedbacks to fetch.
     */
    orderBy?: ComplaintFeedbackOrderByWithRelationInput | ComplaintFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintFeedbacks
    **/
    _count?: true | ComplaintFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplaintFeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplaintFeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintFeedbackMaxAggregateInputType
  }

  export type GetComplaintFeedbackAggregateType<T extends ComplaintFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintFeedback[P]>
      : GetScalarType<T[P], AggregateComplaintFeedback[P]>
  }




  export type ComplaintFeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintFeedbackWhereInput
    orderBy?: ComplaintFeedbackOrderByWithAggregationInput | ComplaintFeedbackOrderByWithAggregationInput[]
    by: ComplaintFeedbackScalarFieldEnum[] | ComplaintFeedbackScalarFieldEnum
    having?: ComplaintFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintFeedbackCountAggregateInputType | true
    _avg?: ComplaintFeedbackAvgAggregateInputType
    _sum?: ComplaintFeedbackSumAggregateInputType
    _min?: ComplaintFeedbackMinAggregateInputType
    _max?: ComplaintFeedbackMaxAggregateInputType
  }

  export type ComplaintFeedbackGroupByOutputType = {
    id: string
    rating: number
    comment: string | null
    createdAt: Date
    complaintId: string
    _count: ComplaintFeedbackCountAggregateOutputType | null
    _avg: ComplaintFeedbackAvgAggregateOutputType | null
    _sum: ComplaintFeedbackSumAggregateOutputType | null
    _min: ComplaintFeedbackMinAggregateOutputType | null
    _max: ComplaintFeedbackMaxAggregateOutputType | null
  }

  type GetComplaintFeedbackGroupByPayload<T extends ComplaintFeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintFeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    complaintId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintFeedback"]>

  export type ComplaintFeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    complaintId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintFeedback"]>

  export type ComplaintFeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    complaintId?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintFeedback"]>

  export type ComplaintFeedbackSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    complaintId?: boolean
  }

  export type ComplaintFeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rating" | "comment" | "createdAt" | "complaintId", ExtArgs["result"]["complaintFeedback"]>
  export type ComplaintFeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintFeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintFeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $ComplaintFeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintFeedback"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rating: number
      comment: string | null
      createdAt: Date
      complaintId: string
    }, ExtArgs["result"]["complaintFeedback"]>
    composites: {}
  }

  type ComplaintFeedbackGetPayload<S extends boolean | null | undefined | ComplaintFeedbackDefaultArgs> = $Result.GetResult<Prisma.$ComplaintFeedbackPayload, S>

  type ComplaintFeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintFeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintFeedbackCountAggregateInputType | true
    }

  export interface ComplaintFeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintFeedback'], meta: { name: 'ComplaintFeedback' } }
    /**
     * Find zero or one ComplaintFeedback that matches the filter.
     * @param {ComplaintFeedbackFindUniqueArgs} args - Arguments to find a ComplaintFeedback
     * @example
     * // Get one ComplaintFeedback
     * const complaintFeedback = await prisma.complaintFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintFeedbackFindUniqueArgs>(args: SelectSubset<T, ComplaintFeedbackFindUniqueArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplaintFeedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintFeedbackFindUniqueOrThrowArgs} args - Arguments to find a ComplaintFeedback
     * @example
     * // Get one ComplaintFeedback
     * const complaintFeedback = await prisma.complaintFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintFeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintFeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackFindFirstArgs} args - Arguments to find a ComplaintFeedback
     * @example
     * // Get one ComplaintFeedback
     * const complaintFeedback = await prisma.complaintFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintFeedbackFindFirstArgs>(args?: SelectSubset<T, ComplaintFeedbackFindFirstArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintFeedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackFindFirstOrThrowArgs} args - Arguments to find a ComplaintFeedback
     * @example
     * // Get one ComplaintFeedback
     * const complaintFeedback = await prisma.complaintFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintFeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintFeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplaintFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintFeedbacks
     * const complaintFeedbacks = await prisma.complaintFeedback.findMany()
     * 
     * // Get first 10 ComplaintFeedbacks
     * const complaintFeedbacks = await prisma.complaintFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintFeedbackWithIdOnly = await prisma.complaintFeedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintFeedbackFindManyArgs>(args?: SelectSubset<T, ComplaintFeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplaintFeedback.
     * @param {ComplaintFeedbackCreateArgs} args - Arguments to create a ComplaintFeedback.
     * @example
     * // Create one ComplaintFeedback
     * const ComplaintFeedback = await prisma.complaintFeedback.create({
     *   data: {
     *     // ... data to create a ComplaintFeedback
     *   }
     * })
     * 
     */
    create<T extends ComplaintFeedbackCreateArgs>(args: SelectSubset<T, ComplaintFeedbackCreateArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplaintFeedbacks.
     * @param {ComplaintFeedbackCreateManyArgs} args - Arguments to create many ComplaintFeedbacks.
     * @example
     * // Create many ComplaintFeedbacks
     * const complaintFeedback = await prisma.complaintFeedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintFeedbackCreateManyArgs>(args?: SelectSubset<T, ComplaintFeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintFeedbacks and returns the data saved in the database.
     * @param {ComplaintFeedbackCreateManyAndReturnArgs} args - Arguments to create many ComplaintFeedbacks.
     * @example
     * // Create many ComplaintFeedbacks
     * const complaintFeedback = await prisma.complaintFeedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintFeedbacks and only return the `id`
     * const complaintFeedbackWithIdOnly = await prisma.complaintFeedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintFeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintFeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplaintFeedback.
     * @param {ComplaintFeedbackDeleteArgs} args - Arguments to delete one ComplaintFeedback.
     * @example
     * // Delete one ComplaintFeedback
     * const ComplaintFeedback = await prisma.complaintFeedback.delete({
     *   where: {
     *     // ... filter to delete one ComplaintFeedback
     *   }
     * })
     * 
     */
    delete<T extends ComplaintFeedbackDeleteArgs>(args: SelectSubset<T, ComplaintFeedbackDeleteArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplaintFeedback.
     * @param {ComplaintFeedbackUpdateArgs} args - Arguments to update one ComplaintFeedback.
     * @example
     * // Update one ComplaintFeedback
     * const complaintFeedback = await prisma.complaintFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintFeedbackUpdateArgs>(args: SelectSubset<T, ComplaintFeedbackUpdateArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplaintFeedbacks.
     * @param {ComplaintFeedbackDeleteManyArgs} args - Arguments to filter ComplaintFeedbacks to delete.
     * @example
     * // Delete a few ComplaintFeedbacks
     * const { count } = await prisma.complaintFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintFeedbackDeleteManyArgs>(args?: SelectSubset<T, ComplaintFeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintFeedbacks
     * const complaintFeedback = await prisma.complaintFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintFeedbackUpdateManyArgs>(args: SelectSubset<T, ComplaintFeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintFeedbacks and returns the data updated in the database.
     * @param {ComplaintFeedbackUpdateManyAndReturnArgs} args - Arguments to update many ComplaintFeedbacks.
     * @example
     * // Update many ComplaintFeedbacks
     * const complaintFeedback = await prisma.complaintFeedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplaintFeedbacks and only return the `id`
     * const complaintFeedbackWithIdOnly = await prisma.complaintFeedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintFeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintFeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplaintFeedback.
     * @param {ComplaintFeedbackUpsertArgs} args - Arguments to update or create a ComplaintFeedback.
     * @example
     * // Update or create a ComplaintFeedback
     * const complaintFeedback = await prisma.complaintFeedback.upsert({
     *   create: {
     *     // ... data to create a ComplaintFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintFeedback we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintFeedbackUpsertArgs>(args: SelectSubset<T, ComplaintFeedbackUpsertArgs<ExtArgs>>): Prisma__ComplaintFeedbackClient<$Result.GetResult<Prisma.$ComplaintFeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplaintFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackCountArgs} args - Arguments to filter ComplaintFeedbacks to count.
     * @example
     * // Count the number of ComplaintFeedbacks
     * const count = await prisma.complaintFeedback.count({
     *   where: {
     *     // ... the filter for the ComplaintFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends ComplaintFeedbackCountArgs>(
      args?: Subset<T, ComplaintFeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintFeedbackAggregateArgs>(args: Subset<T, ComplaintFeedbackAggregateArgs>): Prisma.PrismaPromise<GetComplaintFeedbackAggregateType<T>>

    /**
     * Group by ComplaintFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintFeedback model
   */
  readonly fields: ComplaintFeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintFeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintFeedback model
   */
  interface ComplaintFeedbackFieldRefs {
    readonly id: FieldRef<"ComplaintFeedback", 'String'>
    readonly rating: FieldRef<"ComplaintFeedback", 'Int'>
    readonly comment: FieldRef<"ComplaintFeedback", 'String'>
    readonly createdAt: FieldRef<"ComplaintFeedback", 'DateTime'>
    readonly complaintId: FieldRef<"ComplaintFeedback", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintFeedback findUnique
   */
  export type ComplaintFeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintFeedback to fetch.
     */
    where: ComplaintFeedbackWhereUniqueInput
  }

  /**
   * ComplaintFeedback findUniqueOrThrow
   */
  export type ComplaintFeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintFeedback to fetch.
     */
    where: ComplaintFeedbackWhereUniqueInput
  }

  /**
   * ComplaintFeedback findFirst
   */
  export type ComplaintFeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintFeedback to fetch.
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintFeedbacks to fetch.
     */
    orderBy?: ComplaintFeedbackOrderByWithRelationInput | ComplaintFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintFeedbacks.
     */
    cursor?: ComplaintFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintFeedbacks.
     */
    distinct?: ComplaintFeedbackScalarFieldEnum | ComplaintFeedbackScalarFieldEnum[]
  }

  /**
   * ComplaintFeedback findFirstOrThrow
   */
  export type ComplaintFeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintFeedback to fetch.
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintFeedbacks to fetch.
     */
    orderBy?: ComplaintFeedbackOrderByWithRelationInput | ComplaintFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintFeedbacks.
     */
    cursor?: ComplaintFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintFeedbacks.
     */
    distinct?: ComplaintFeedbackScalarFieldEnum | ComplaintFeedbackScalarFieldEnum[]
  }

  /**
   * ComplaintFeedback findMany
   */
  export type ComplaintFeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintFeedbacks to fetch.
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintFeedbacks to fetch.
     */
    orderBy?: ComplaintFeedbackOrderByWithRelationInput | ComplaintFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintFeedbacks.
     */
    cursor?: ComplaintFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintFeedbacks.
     */
    skip?: number
    distinct?: ComplaintFeedbackScalarFieldEnum | ComplaintFeedbackScalarFieldEnum[]
  }

  /**
   * ComplaintFeedback create
   */
  export type ComplaintFeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintFeedback.
     */
    data: XOR<ComplaintFeedbackCreateInput, ComplaintFeedbackUncheckedCreateInput>
  }

  /**
   * ComplaintFeedback createMany
   */
  export type ComplaintFeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintFeedbacks.
     */
    data: ComplaintFeedbackCreateManyInput | ComplaintFeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplaintFeedback createManyAndReturn
   */
  export type ComplaintFeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many ComplaintFeedbacks.
     */
    data: ComplaintFeedbackCreateManyInput | ComplaintFeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintFeedback update
   */
  export type ComplaintFeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintFeedback.
     */
    data: XOR<ComplaintFeedbackUpdateInput, ComplaintFeedbackUncheckedUpdateInput>
    /**
     * Choose, which ComplaintFeedback to update.
     */
    where: ComplaintFeedbackWhereUniqueInput
  }

  /**
   * ComplaintFeedback updateMany
   */
  export type ComplaintFeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintFeedbacks.
     */
    data: XOR<ComplaintFeedbackUpdateManyMutationInput, ComplaintFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintFeedbacks to update
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * Limit how many ComplaintFeedbacks to update.
     */
    limit?: number
  }

  /**
   * ComplaintFeedback updateManyAndReturn
   */
  export type ComplaintFeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * The data used to update ComplaintFeedbacks.
     */
    data: XOR<ComplaintFeedbackUpdateManyMutationInput, ComplaintFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintFeedbacks to update
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * Limit how many ComplaintFeedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintFeedback upsert
   */
  export type ComplaintFeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintFeedback to update in case it exists.
     */
    where: ComplaintFeedbackWhereUniqueInput
    /**
     * In case the ComplaintFeedback found by the `where` argument doesn't exist, create a new ComplaintFeedback with this data.
     */
    create: XOR<ComplaintFeedbackCreateInput, ComplaintFeedbackUncheckedCreateInput>
    /**
     * In case the ComplaintFeedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintFeedbackUpdateInput, ComplaintFeedbackUncheckedUpdateInput>
  }

  /**
   * ComplaintFeedback delete
   */
  export type ComplaintFeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
    /**
     * Filter which ComplaintFeedback to delete.
     */
    where: ComplaintFeedbackWhereUniqueInput
  }

  /**
   * ComplaintFeedback deleteMany
   */
  export type ComplaintFeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintFeedbacks to delete
     */
    where?: ComplaintFeedbackWhereInput
    /**
     * Limit how many ComplaintFeedbacks to delete.
     */
    limit?: number
  }

  /**
   * ComplaintFeedback without action
   */
  export type ComplaintFeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintFeedback
     */
    select?: ComplaintFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintFeedback
     */
    omit?: ComplaintFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintFeedbackInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintStatusLog
   */

  export type AggregateComplaintStatusLog = {
    _count: ComplaintStatusLogCountAggregateOutputType | null
    _min: ComplaintStatusLogMinAggregateOutputType | null
    _max: ComplaintStatusLogMaxAggregateOutputType | null
  }

  export type ComplaintStatusLogMinAggregateOutputType = {
    id: string | null
    oldStatus: $Enums.ComplaintStatus | null
    newStatus: $Enums.ComplaintStatus | null
    createdAt: Date | null
    complaintId: string | null
    changedById: string | null
  }

  export type ComplaintStatusLogMaxAggregateOutputType = {
    id: string | null
    oldStatus: $Enums.ComplaintStatus | null
    newStatus: $Enums.ComplaintStatus | null
    createdAt: Date | null
    complaintId: string | null
    changedById: string | null
  }

  export type ComplaintStatusLogCountAggregateOutputType = {
    id: number
    oldStatus: number
    newStatus: number
    createdAt: number
    complaintId: number
    changedById: number
    _all: number
  }


  export type ComplaintStatusLogMinAggregateInputType = {
    id?: true
    oldStatus?: true
    newStatus?: true
    createdAt?: true
    complaintId?: true
    changedById?: true
  }

  export type ComplaintStatusLogMaxAggregateInputType = {
    id?: true
    oldStatus?: true
    newStatus?: true
    createdAt?: true
    complaintId?: true
    changedById?: true
  }

  export type ComplaintStatusLogCountAggregateInputType = {
    id?: true
    oldStatus?: true
    newStatus?: true
    createdAt?: true
    complaintId?: true
    changedById?: true
    _all?: true
  }

  export type ComplaintStatusLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintStatusLog to aggregate.
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintStatusLogs to fetch.
     */
    orderBy?: ComplaintStatusLogOrderByWithRelationInput | ComplaintStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintStatusLogs
    **/
    _count?: true | ComplaintStatusLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintStatusLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintStatusLogMaxAggregateInputType
  }

  export type GetComplaintStatusLogAggregateType<T extends ComplaintStatusLogAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintStatusLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintStatusLog[P]>
      : GetScalarType<T[P], AggregateComplaintStatusLog[P]>
  }




  export type ComplaintStatusLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintStatusLogWhereInput
    orderBy?: ComplaintStatusLogOrderByWithAggregationInput | ComplaintStatusLogOrderByWithAggregationInput[]
    by: ComplaintStatusLogScalarFieldEnum[] | ComplaintStatusLogScalarFieldEnum
    having?: ComplaintStatusLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintStatusLogCountAggregateInputType | true
    _min?: ComplaintStatusLogMinAggregateInputType
    _max?: ComplaintStatusLogMaxAggregateInputType
  }

  export type ComplaintStatusLogGroupByOutputType = {
    id: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt: Date
    complaintId: string
    changedById: string
    _count: ComplaintStatusLogCountAggregateOutputType | null
    _min: ComplaintStatusLogMinAggregateOutputType | null
    _max: ComplaintStatusLogMaxAggregateOutputType | null
  }

  type GetComplaintStatusLogGroupByPayload<T extends ComplaintStatusLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintStatusLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintStatusLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintStatusLogGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintStatusLogGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintStatusLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    createdAt?: boolean
    complaintId?: boolean
    changedById?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintStatusLog"]>

  export type ComplaintStatusLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    createdAt?: boolean
    complaintId?: boolean
    changedById?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintStatusLog"]>

  export type ComplaintStatusLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    createdAt?: boolean
    complaintId?: boolean
    changedById?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintStatusLog"]>

  export type ComplaintStatusLogSelectScalar = {
    id?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    createdAt?: boolean
    complaintId?: boolean
    changedById?: boolean
  }

  export type ComplaintStatusLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "oldStatus" | "newStatus" | "createdAt" | "complaintId" | "changedById", ExtArgs["result"]["complaintStatusLog"]>
  export type ComplaintStatusLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ComplaintStatusLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ComplaintStatusLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ComplaintStatusLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintStatusLog"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
      changedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      oldStatus: $Enums.ComplaintStatus
      newStatus: $Enums.ComplaintStatus
      createdAt: Date
      complaintId: string
      changedById: string
    }, ExtArgs["result"]["complaintStatusLog"]>
    composites: {}
  }

  type ComplaintStatusLogGetPayload<S extends boolean | null | undefined | ComplaintStatusLogDefaultArgs> = $Result.GetResult<Prisma.$ComplaintStatusLogPayload, S>

  type ComplaintStatusLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintStatusLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintStatusLogCountAggregateInputType | true
    }

  export interface ComplaintStatusLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintStatusLog'], meta: { name: 'ComplaintStatusLog' } }
    /**
     * Find zero or one ComplaintStatusLog that matches the filter.
     * @param {ComplaintStatusLogFindUniqueArgs} args - Arguments to find a ComplaintStatusLog
     * @example
     * // Get one ComplaintStatusLog
     * const complaintStatusLog = await prisma.complaintStatusLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintStatusLogFindUniqueArgs>(args: SelectSubset<T, ComplaintStatusLogFindUniqueArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplaintStatusLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintStatusLogFindUniqueOrThrowArgs} args - Arguments to find a ComplaintStatusLog
     * @example
     * // Get one ComplaintStatusLog
     * const complaintStatusLog = await prisma.complaintStatusLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintStatusLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintStatusLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintStatusLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogFindFirstArgs} args - Arguments to find a ComplaintStatusLog
     * @example
     * // Get one ComplaintStatusLog
     * const complaintStatusLog = await prisma.complaintStatusLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintStatusLogFindFirstArgs>(args?: SelectSubset<T, ComplaintStatusLogFindFirstArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintStatusLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogFindFirstOrThrowArgs} args - Arguments to find a ComplaintStatusLog
     * @example
     * // Get one ComplaintStatusLog
     * const complaintStatusLog = await prisma.complaintStatusLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintStatusLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintStatusLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplaintStatusLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintStatusLogs
     * const complaintStatusLogs = await prisma.complaintStatusLog.findMany()
     * 
     * // Get first 10 ComplaintStatusLogs
     * const complaintStatusLogs = await prisma.complaintStatusLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintStatusLogWithIdOnly = await prisma.complaintStatusLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintStatusLogFindManyArgs>(args?: SelectSubset<T, ComplaintStatusLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplaintStatusLog.
     * @param {ComplaintStatusLogCreateArgs} args - Arguments to create a ComplaintStatusLog.
     * @example
     * // Create one ComplaintStatusLog
     * const ComplaintStatusLog = await prisma.complaintStatusLog.create({
     *   data: {
     *     // ... data to create a ComplaintStatusLog
     *   }
     * })
     * 
     */
    create<T extends ComplaintStatusLogCreateArgs>(args: SelectSubset<T, ComplaintStatusLogCreateArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplaintStatusLogs.
     * @param {ComplaintStatusLogCreateManyArgs} args - Arguments to create many ComplaintStatusLogs.
     * @example
     * // Create many ComplaintStatusLogs
     * const complaintStatusLog = await prisma.complaintStatusLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintStatusLogCreateManyArgs>(args?: SelectSubset<T, ComplaintStatusLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintStatusLogs and returns the data saved in the database.
     * @param {ComplaintStatusLogCreateManyAndReturnArgs} args - Arguments to create many ComplaintStatusLogs.
     * @example
     * // Create many ComplaintStatusLogs
     * const complaintStatusLog = await prisma.complaintStatusLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintStatusLogs and only return the `id`
     * const complaintStatusLogWithIdOnly = await prisma.complaintStatusLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintStatusLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintStatusLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplaintStatusLog.
     * @param {ComplaintStatusLogDeleteArgs} args - Arguments to delete one ComplaintStatusLog.
     * @example
     * // Delete one ComplaintStatusLog
     * const ComplaintStatusLog = await prisma.complaintStatusLog.delete({
     *   where: {
     *     // ... filter to delete one ComplaintStatusLog
     *   }
     * })
     * 
     */
    delete<T extends ComplaintStatusLogDeleteArgs>(args: SelectSubset<T, ComplaintStatusLogDeleteArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplaintStatusLog.
     * @param {ComplaintStatusLogUpdateArgs} args - Arguments to update one ComplaintStatusLog.
     * @example
     * // Update one ComplaintStatusLog
     * const complaintStatusLog = await prisma.complaintStatusLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintStatusLogUpdateArgs>(args: SelectSubset<T, ComplaintStatusLogUpdateArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplaintStatusLogs.
     * @param {ComplaintStatusLogDeleteManyArgs} args - Arguments to filter ComplaintStatusLogs to delete.
     * @example
     * // Delete a few ComplaintStatusLogs
     * const { count } = await prisma.complaintStatusLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintStatusLogDeleteManyArgs>(args?: SelectSubset<T, ComplaintStatusLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintStatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintStatusLogs
     * const complaintStatusLog = await prisma.complaintStatusLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintStatusLogUpdateManyArgs>(args: SelectSubset<T, ComplaintStatusLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintStatusLogs and returns the data updated in the database.
     * @param {ComplaintStatusLogUpdateManyAndReturnArgs} args - Arguments to update many ComplaintStatusLogs.
     * @example
     * // Update many ComplaintStatusLogs
     * const complaintStatusLog = await prisma.complaintStatusLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplaintStatusLogs and only return the `id`
     * const complaintStatusLogWithIdOnly = await prisma.complaintStatusLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintStatusLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintStatusLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplaintStatusLog.
     * @param {ComplaintStatusLogUpsertArgs} args - Arguments to update or create a ComplaintStatusLog.
     * @example
     * // Update or create a ComplaintStatusLog
     * const complaintStatusLog = await prisma.complaintStatusLog.upsert({
     *   create: {
     *     // ... data to create a ComplaintStatusLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintStatusLog we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintStatusLogUpsertArgs>(args: SelectSubset<T, ComplaintStatusLogUpsertArgs<ExtArgs>>): Prisma__ComplaintStatusLogClient<$Result.GetResult<Prisma.$ComplaintStatusLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplaintStatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogCountArgs} args - Arguments to filter ComplaintStatusLogs to count.
     * @example
     * // Count the number of ComplaintStatusLogs
     * const count = await prisma.complaintStatusLog.count({
     *   where: {
     *     // ... the filter for the ComplaintStatusLogs we want to count
     *   }
     * })
    **/
    count<T extends ComplaintStatusLogCountArgs>(
      args?: Subset<T, ComplaintStatusLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintStatusLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintStatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintStatusLogAggregateArgs>(args: Subset<T, ComplaintStatusLogAggregateArgs>): Prisma.PrismaPromise<GetComplaintStatusLogAggregateType<T>>

    /**
     * Group by ComplaintStatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintStatusLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintStatusLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintStatusLogGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintStatusLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintStatusLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintStatusLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintStatusLog model
   */
  readonly fields: ComplaintStatusLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintStatusLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintStatusLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintStatusLog model
   */
  interface ComplaintStatusLogFieldRefs {
    readonly id: FieldRef<"ComplaintStatusLog", 'String'>
    readonly oldStatus: FieldRef<"ComplaintStatusLog", 'ComplaintStatus'>
    readonly newStatus: FieldRef<"ComplaintStatusLog", 'ComplaintStatus'>
    readonly createdAt: FieldRef<"ComplaintStatusLog", 'DateTime'>
    readonly complaintId: FieldRef<"ComplaintStatusLog", 'String'>
    readonly changedById: FieldRef<"ComplaintStatusLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintStatusLog findUnique
   */
  export type ComplaintStatusLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintStatusLog to fetch.
     */
    where: ComplaintStatusLogWhereUniqueInput
  }

  /**
   * ComplaintStatusLog findUniqueOrThrow
   */
  export type ComplaintStatusLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintStatusLog to fetch.
     */
    where: ComplaintStatusLogWhereUniqueInput
  }

  /**
   * ComplaintStatusLog findFirst
   */
  export type ComplaintStatusLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintStatusLog to fetch.
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintStatusLogs to fetch.
     */
    orderBy?: ComplaintStatusLogOrderByWithRelationInput | ComplaintStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintStatusLogs.
     */
    cursor?: ComplaintStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintStatusLogs.
     */
    distinct?: ComplaintStatusLogScalarFieldEnum | ComplaintStatusLogScalarFieldEnum[]
  }

  /**
   * ComplaintStatusLog findFirstOrThrow
   */
  export type ComplaintStatusLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintStatusLog to fetch.
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintStatusLogs to fetch.
     */
    orderBy?: ComplaintStatusLogOrderByWithRelationInput | ComplaintStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintStatusLogs.
     */
    cursor?: ComplaintStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintStatusLogs.
     */
    distinct?: ComplaintStatusLogScalarFieldEnum | ComplaintStatusLogScalarFieldEnum[]
  }

  /**
   * ComplaintStatusLog findMany
   */
  export type ComplaintStatusLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintStatusLogs to fetch.
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintStatusLogs to fetch.
     */
    orderBy?: ComplaintStatusLogOrderByWithRelationInput | ComplaintStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintStatusLogs.
     */
    cursor?: ComplaintStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintStatusLogs.
     */
    skip?: number
    distinct?: ComplaintStatusLogScalarFieldEnum | ComplaintStatusLogScalarFieldEnum[]
  }

  /**
   * ComplaintStatusLog create
   */
  export type ComplaintStatusLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintStatusLog.
     */
    data: XOR<ComplaintStatusLogCreateInput, ComplaintStatusLogUncheckedCreateInput>
  }

  /**
   * ComplaintStatusLog createMany
   */
  export type ComplaintStatusLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintStatusLogs.
     */
    data: ComplaintStatusLogCreateManyInput | ComplaintStatusLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplaintStatusLog createManyAndReturn
   */
  export type ComplaintStatusLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * The data used to create many ComplaintStatusLogs.
     */
    data: ComplaintStatusLogCreateManyInput | ComplaintStatusLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintStatusLog update
   */
  export type ComplaintStatusLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintStatusLog.
     */
    data: XOR<ComplaintStatusLogUpdateInput, ComplaintStatusLogUncheckedUpdateInput>
    /**
     * Choose, which ComplaintStatusLog to update.
     */
    where: ComplaintStatusLogWhereUniqueInput
  }

  /**
   * ComplaintStatusLog updateMany
   */
  export type ComplaintStatusLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintStatusLogs.
     */
    data: XOR<ComplaintStatusLogUpdateManyMutationInput, ComplaintStatusLogUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintStatusLogs to update
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * Limit how many ComplaintStatusLogs to update.
     */
    limit?: number
  }

  /**
   * ComplaintStatusLog updateManyAndReturn
   */
  export type ComplaintStatusLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * The data used to update ComplaintStatusLogs.
     */
    data: XOR<ComplaintStatusLogUpdateManyMutationInput, ComplaintStatusLogUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintStatusLogs to update
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * Limit how many ComplaintStatusLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintStatusLog upsert
   */
  export type ComplaintStatusLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintStatusLog to update in case it exists.
     */
    where: ComplaintStatusLogWhereUniqueInput
    /**
     * In case the ComplaintStatusLog found by the `where` argument doesn't exist, create a new ComplaintStatusLog with this data.
     */
    create: XOR<ComplaintStatusLogCreateInput, ComplaintStatusLogUncheckedCreateInput>
    /**
     * In case the ComplaintStatusLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintStatusLogUpdateInput, ComplaintStatusLogUncheckedUpdateInput>
  }

  /**
   * ComplaintStatusLog delete
   */
  export type ComplaintStatusLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
    /**
     * Filter which ComplaintStatusLog to delete.
     */
    where: ComplaintStatusLogWhereUniqueInput
  }

  /**
   * ComplaintStatusLog deleteMany
   */
  export type ComplaintStatusLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintStatusLogs to delete
     */
    where?: ComplaintStatusLogWhereInput
    /**
     * Limit how many ComplaintStatusLogs to delete.
     */
    limit?: number
  }

  /**
   * ComplaintStatusLog without action
   */
  export type ComplaintStatusLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintStatusLog
     */
    select?: ComplaintStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintStatusLog
     */
    omit?: ComplaintStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintStatusLogInclude<ExtArgs> | null
  }


  /**
   * Model NotificationPreference
   */

  export type AggregateNotificationPreference = {
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  export type NotificationPreferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    email: boolean | null
    push: boolean | null
    sms: boolean | null
    newComplaints: boolean | null
    statusUpdates: boolean | null
    announcements: boolean | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    email: boolean | null
    push: boolean | null
    sms: boolean | null
    newComplaints: boolean | null
    statusUpdates: boolean | null
    announcements: boolean | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    push: number
    sms: number
    newComplaints: number
    statusUpdates: number
    announcements: number
    updatedAt: number
    _all: number
  }


  export type NotificationPreferenceMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    push?: true
    sms?: true
    newComplaints?: true
    statusUpdates?: true
    announcements?: true
    updatedAt?: true
  }

  export type NotificationPreferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    push?: true
    sms?: true
    newComplaints?: true
    statusUpdates?: true
    announcements?: true
    updatedAt?: true
  }

  export type NotificationPreferenceCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    push?: true
    sms?: true
    newComplaints?: true
    statusUpdates?: true
    announcements?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreference to aggregate.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPreferences
    **/
    _count?: true | NotificationPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type GetNotificationPreferenceAggregateType<T extends NotificationPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPreference[P]>
      : GetScalarType<T[P], AggregateNotificationPreference[P]>
  }




  export type NotificationPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferenceWhereInput
    orderBy?: NotificationPreferenceOrderByWithAggregationInput | NotificationPreferenceOrderByWithAggregationInput[]
    by: NotificationPreferenceScalarFieldEnum[] | NotificationPreferenceScalarFieldEnum
    having?: NotificationPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPreferenceCountAggregateInputType | true
    _min?: NotificationPreferenceMinAggregateInputType
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type NotificationPreferenceGroupByOutputType = {
    id: string
    userId: string
    email: boolean
    push: boolean
    sms: boolean
    newComplaints: boolean
    statusUpdates: boolean
    announcements: boolean
    updatedAt: Date
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  type GetNotificationPreferenceGroupByPayload<T extends NotificationPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: boolean
  }

  export type NotificationPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "push" | "sms" | "newComplaints" | "statusUpdates" | "announcements" | "updatedAt", ExtArgs["result"]["notificationPreference"]>
  export type NotificationPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationPreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPreference"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      email: boolean
      push: boolean
      sms: boolean
      newComplaints: boolean
      statusUpdates: boolean
      announcements: boolean
      updatedAt: Date
    }, ExtArgs["result"]["notificationPreference"]>
    composites: {}
  }

  type NotificationPreferenceGetPayload<S extends boolean | null | undefined | NotificationPreferenceDefaultArgs> = $Result.GetResult<Prisma.$NotificationPreferencePayload, S>

  type NotificationPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationPreferenceCountAggregateInputType | true
    }

  export interface NotificationPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPreference'], meta: { name: 'NotificationPreference' } }
    /**
     * Find zero or one NotificationPreference that matches the filter.
     * @param {NotificationPreferenceFindUniqueArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPreferenceFindUniqueArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationPreferenceFindUniqueOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPreferenceFindFirstArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany()
     * 
     * // Get first 10 NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationPreferenceFindManyArgs>(args?: SelectSubset<T, NotificationPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationPreference.
     * @param {NotificationPreferenceCreateArgs} args - Arguments to create a NotificationPreference.
     * @example
     * // Create one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.create({
     *   data: {
     *     // ... data to create a NotificationPreference
     *   }
     * })
     * 
     */
    create<T extends NotificationPreferenceCreateArgs>(args: SelectSubset<T, NotificationPreferenceCreateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationPreferences.
     * @param {NotificationPreferenceCreateManyArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPreferenceCreateManyArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPreferences and returns the data saved in the database.
     * @param {NotificationPreferenceCreateManyAndReturnArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationPreference.
     * @param {NotificationPreferenceDeleteArgs} args - Arguments to delete one NotificationPreference.
     * @example
     * // Delete one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.delete({
     *   where: {
     *     // ... filter to delete one NotificationPreference
     *   }
     * })
     * 
     */
    delete<T extends NotificationPreferenceDeleteArgs>(args: SelectSubset<T, NotificationPreferenceDeleteArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationPreference.
     * @param {NotificationPreferenceUpdateArgs} args - Arguments to update one NotificationPreference.
     * @example
     * // Update one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPreferenceUpdateArgs>(args: SelectSubset<T, NotificationPreferenceUpdateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationPreferences.
     * @param {NotificationPreferenceDeleteManyArgs} args - Arguments to filter NotificationPreferences to delete.
     * @example
     * // Delete a few NotificationPreferences
     * const { count } = await prisma.notificationPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPreferenceDeleteManyArgs>(args?: SelectSubset<T, NotificationPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPreferenceUpdateManyArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences and returns the data updated in the database.
     * @param {NotificationPreferenceUpdateManyAndReturnArgs} args - Arguments to update many NotificationPreferences.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationPreference.
     * @param {NotificationPreferenceUpsertArgs} args - Arguments to update or create a NotificationPreference.
     * @example
     * // Update or create a NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.upsert({
     *   create: {
     *     // ... data to create a NotificationPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPreference we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPreferenceUpsertArgs>(args: SelectSubset<T, NotificationPreferenceUpsertArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceCountArgs} args - Arguments to filter NotificationPreferences to count.
     * @example
     * // Count the number of NotificationPreferences
     * const count = await prisma.notificationPreference.count({
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends NotificationPreferenceCountArgs>(
      args?: Subset<T, NotificationPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationPreferenceAggregateArgs>(args: Subset<T, NotificationPreferenceAggregateArgs>): Prisma.PrismaPromise<GetNotificationPreferenceAggregateType<T>>

    /**
     * Group by NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPreference model
   */
  readonly fields: NotificationPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationPreference model
   */
  interface NotificationPreferenceFieldRefs {
    readonly id: FieldRef<"NotificationPreference", 'String'>
    readonly userId: FieldRef<"NotificationPreference", 'String'>
    readonly email: FieldRef<"NotificationPreference", 'Boolean'>
    readonly push: FieldRef<"NotificationPreference", 'Boolean'>
    readonly sms: FieldRef<"NotificationPreference", 'Boolean'>
    readonly newComplaints: FieldRef<"NotificationPreference", 'Boolean'>
    readonly statusUpdates: FieldRef<"NotificationPreference", 'Boolean'>
    readonly announcements: FieldRef<"NotificationPreference", 'Boolean'>
    readonly updatedAt: FieldRef<"NotificationPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPreference findUnique
   */
  export type NotificationPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findUniqueOrThrow
   */
  export type NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findFirst
   */
  export type NotificationPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findFirstOrThrow
   */
  export type NotificationPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findMany
   */
  export type NotificationPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference create
   */
  export type NotificationPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationPreference.
     */
    data: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
  }

  /**
   * NotificationPreference createMany
   */
  export type NotificationPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference createManyAndReturn
   */
  export type NotificationPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationPreference update
   */
  export type NotificationPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationPreference.
     */
    data: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
    /**
     * Choose, which NotificationPreference to update.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference updateMany
   */
  export type NotificationPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference updateManyAndReturn
   */
  export type NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationPreference upsert
   */
  export type NotificationPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationPreference to update in case it exists.
     */
    where: NotificationPreferenceWhereUniqueInput
    /**
     * In case the NotificationPreference found by the `where` argument doesn't exist, create a new NotificationPreference with this data.
     */
    create: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
    /**
     * In case the NotificationPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
  }

  /**
   * NotificationPreference delete
   */
  export type NotificationPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
    /**
     * Filter which NotificationPreference to delete.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference deleteMany
   */
  export type NotificationPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to delete
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to delete.
     */
    limit?: number
  }

  /**
   * NotificationPreference without action
   */
  export type NotificationPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPreferenceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    role: 'role',
    status: 'status',
    phone: 'phone',
    department: 'department',
    studentId: 'studentId',
    hostelBlock: 'hostelBlock',
    roomNumber: 'roomNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLogin: 'lastLogin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ComplaintScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    status: 'status',
    priority: 'priority',
    hostelBlock: 'hostelBlock',
    roomNumber: 'roomNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    studentId: 'studentId',
    assignedToId: 'assignedToId'
  };

  export type ComplaintScalarFieldEnum = (typeof ComplaintScalarFieldEnum)[keyof typeof ComplaintScalarFieldEnum]


  export const ComplaintUpdateScalarFieldEnum: {
    id: 'id',
    message: 'message',
    createdAt: 'createdAt',
    complaintId: 'complaintId',
    staffId: 'staffId'
  };

  export type ComplaintUpdateScalarFieldEnum = (typeof ComplaintUpdateScalarFieldEnum)[keyof typeof ComplaintUpdateScalarFieldEnum]


  export const ComplaintAttachmentScalarFieldEnum: {
    id: 'id',
    fileUrl: 'fileUrl',
    fileName: 'fileName',
    fileType: 'fileType',
    fileSize: 'fileSize',
    createdAt: 'createdAt',
    complaintId: 'complaintId'
  };

  export type ComplaintAttachmentScalarFieldEnum = (typeof ComplaintAttachmentScalarFieldEnum)[keyof typeof ComplaintAttachmentScalarFieldEnum]


  export const ComplaintFeedbackScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    complaintId: 'complaintId'
  };

  export type ComplaintFeedbackScalarFieldEnum = (typeof ComplaintFeedbackScalarFieldEnum)[keyof typeof ComplaintFeedbackScalarFieldEnum]


  export const ComplaintStatusLogScalarFieldEnum: {
    id: 'id',
    oldStatus: 'oldStatus',
    newStatus: 'newStatus',
    createdAt: 'createdAt',
    complaintId: 'complaintId',
    changedById: 'changedById'
  };

  export type ComplaintStatusLogScalarFieldEnum = (typeof ComplaintStatusLogScalarFieldEnum)[keyof typeof ComplaintStatusLogScalarFieldEnum]


  export const NotificationPreferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    push: 'push',
    sms: 'sms',
    newComplaints: 'newComplaints',
    statusUpdates: 'statusUpdates',
    announcements: 'announcements',
    updatedAt: 'updatedAt'
  };

  export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ComplaintCategory'
   */
  export type EnumComplaintCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintCategory'>
    


  /**
   * Reference to a field of type 'ComplaintCategory[]'
   */
  export type ListEnumComplaintCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintCategory[]'>
    


  /**
   * Reference to a field of type 'ComplaintStatus'
   */
  export type EnumComplaintStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintStatus'>
    


  /**
   * Reference to a field of type 'ComplaintStatus[]'
   */
  export type ListEnumComplaintStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintStatus[]'>
    


  /**
   * Reference to a field of type 'ComplaintPriority'
   */
  export type EnumComplaintPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintPriority'>
    


  /**
   * Reference to a field of type 'ComplaintPriority[]'
   */
  export type ListEnumComplaintPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplaintPriority[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    phone?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    studentId?: StringNullableFilter<"User"> | string | null
    hostelBlock?: StringNullableFilter<"User"> | string | null
    roomNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    complaints?: ComplaintListRelationFilter
    assignedComplaints?: ComplaintListRelationFilter
    complaintUpdates?: ComplaintUpdateListRelationFilter
    notificationPreference?: XOR<NotificationPreferenceNullableScalarRelationFilter, NotificationPreferenceWhereInput> | null
    statusChanges?: ComplaintStatusLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    status?: SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    hostelBlock?: SortOrderInput | SortOrder
    roomNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    complaints?: ComplaintOrderByRelationAggregateInput
    assignedComplaints?: ComplaintOrderByRelationAggregateInput
    complaintUpdates?: ComplaintUpdateOrderByRelationAggregateInput
    notificationPreference?: NotificationPreferenceOrderByWithRelationInput
    statusChanges?: ComplaintStatusLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    studentId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    phone?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    hostelBlock?: StringNullableFilter<"User"> | string | null
    roomNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    complaints?: ComplaintListRelationFilter
    assignedComplaints?: ComplaintListRelationFilter
    complaintUpdates?: ComplaintUpdateListRelationFilter
    notificationPreference?: XOR<NotificationPreferenceNullableScalarRelationFilter, NotificationPreferenceWhereInput> | null
    statusChanges?: ComplaintStatusLogListRelationFilter
  }, "id" | "email" | "studentId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    status?: SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    hostelBlock?: SortOrderInput | SortOrder
    roomNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    studentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    hostelBlock?: StringNullableWithAggregatesFilter<"User"> | string | null
    roomNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ComplaintWhereInput = {
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    id?: StringFilter<"Complaint"> | string
    title?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    category?: EnumComplaintCategoryFilter<"Complaint"> | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFilter<"Complaint"> | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFilter<"Complaint"> | $Enums.ComplaintPriority
    hostelBlock?: StringFilter<"Complaint"> | string
    roomNumber?: StringFilter<"Complaint"> | string
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    studentId?: StringFilter<"Complaint"> | string
    assignedToId?: StringNullableFilter<"Complaint"> | string | null
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updates?: ComplaintUpdateListRelationFilter
    attachments?: ComplaintAttachmentListRelationFilter
    feedback?: XOR<ComplaintFeedbackNullableScalarRelationFilter, ComplaintFeedbackWhereInput> | null
    statusLogs?: ComplaintStatusLogListRelationFilter
  }

  export type ComplaintOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    student?: UserOrderByWithRelationInput
    assignedTo?: UserOrderByWithRelationInput
    updates?: ComplaintUpdateOrderByRelationAggregateInput
    attachments?: ComplaintAttachmentOrderByRelationAggregateInput
    feedback?: ComplaintFeedbackOrderByWithRelationInput
    statusLogs?: ComplaintStatusLogOrderByRelationAggregateInput
  }

  export type ComplaintWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    title?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    category?: EnumComplaintCategoryFilter<"Complaint"> | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFilter<"Complaint"> | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFilter<"Complaint"> | $Enums.ComplaintPriority
    hostelBlock?: StringFilter<"Complaint"> | string
    roomNumber?: StringFilter<"Complaint"> | string
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    studentId?: StringFilter<"Complaint"> | string
    assignedToId?: StringNullableFilter<"Complaint"> | string | null
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updates?: ComplaintUpdateListRelationFilter
    attachments?: ComplaintAttachmentListRelationFilter
    feedback?: XOR<ComplaintFeedbackNullableScalarRelationFilter, ComplaintFeedbackWhereInput> | null
    statusLogs?: ComplaintStatusLogListRelationFilter
  }, "id">

  export type ComplaintOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    _count?: ComplaintCountOrderByAggregateInput
    _max?: ComplaintMaxOrderByAggregateInput
    _min?: ComplaintMinOrderByAggregateInput
  }

  export type ComplaintScalarWhereWithAggregatesInput = {
    AND?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    OR?: ComplaintScalarWhereWithAggregatesInput[]
    NOT?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Complaint"> | string
    title?: StringWithAggregatesFilter<"Complaint"> | string
    description?: StringWithAggregatesFilter<"Complaint"> | string
    category?: EnumComplaintCategoryWithAggregatesFilter<"Complaint"> | $Enums.ComplaintCategory
    status?: EnumComplaintStatusWithAggregatesFilter<"Complaint"> | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityWithAggregatesFilter<"Complaint"> | $Enums.ComplaintPriority
    hostelBlock?: StringWithAggregatesFilter<"Complaint"> | string
    roomNumber?: StringWithAggregatesFilter<"Complaint"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
    studentId?: StringWithAggregatesFilter<"Complaint"> | string
    assignedToId?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
  }

  export type ComplaintUpdateWhereInput = {
    AND?: ComplaintUpdateWhereInput | ComplaintUpdateWhereInput[]
    OR?: ComplaintUpdateWhereInput[]
    NOT?: ComplaintUpdateWhereInput | ComplaintUpdateWhereInput[]
    id?: StringFilter<"ComplaintUpdate"> | string
    message?: StringFilter<"ComplaintUpdate"> | string
    createdAt?: DateTimeFilter<"ComplaintUpdate"> | Date | string
    complaintId?: StringFilter<"ComplaintUpdate"> | string
    staffId?: StringNullableFilter<"ComplaintUpdate"> | string | null
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
    staff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ComplaintUpdateOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    staffId?: SortOrderInput | SortOrder
    complaint?: ComplaintOrderByWithRelationInput
    staff?: UserOrderByWithRelationInput
  }

  export type ComplaintUpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintUpdateWhereInput | ComplaintUpdateWhereInput[]
    OR?: ComplaintUpdateWhereInput[]
    NOT?: ComplaintUpdateWhereInput | ComplaintUpdateWhereInput[]
    message?: StringFilter<"ComplaintUpdate"> | string
    createdAt?: DateTimeFilter<"ComplaintUpdate"> | Date | string
    complaintId?: StringFilter<"ComplaintUpdate"> | string
    staffId?: StringNullableFilter<"ComplaintUpdate"> | string | null
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
    staff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ComplaintUpdateOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    staffId?: SortOrderInput | SortOrder
    _count?: ComplaintUpdateCountOrderByAggregateInput
    _max?: ComplaintUpdateMaxOrderByAggregateInput
    _min?: ComplaintUpdateMinOrderByAggregateInput
  }

  export type ComplaintUpdateScalarWhereWithAggregatesInput = {
    AND?: ComplaintUpdateScalarWhereWithAggregatesInput | ComplaintUpdateScalarWhereWithAggregatesInput[]
    OR?: ComplaintUpdateScalarWhereWithAggregatesInput[]
    NOT?: ComplaintUpdateScalarWhereWithAggregatesInput | ComplaintUpdateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintUpdate"> | string
    message?: StringWithAggregatesFilter<"ComplaintUpdate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintUpdate"> | Date | string
    complaintId?: StringWithAggregatesFilter<"ComplaintUpdate"> | string
    staffId?: StringNullableWithAggregatesFilter<"ComplaintUpdate"> | string | null
  }

  export type ComplaintAttachmentWhereInput = {
    AND?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    OR?: ComplaintAttachmentWhereInput[]
    NOT?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    id?: StringFilter<"ComplaintAttachment"> | string
    fileUrl?: StringFilter<"ComplaintAttachment"> | string
    fileName?: StringFilter<"ComplaintAttachment"> | string
    fileType?: StringFilter<"ComplaintAttachment"> | string
    fileSize?: IntFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeFilter<"ComplaintAttachment"> | Date | string
    complaintId?: StringFilter<"ComplaintAttachment"> | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }

  export type ComplaintAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    fileUrl?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type ComplaintAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    OR?: ComplaintAttachmentWhereInput[]
    NOT?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    fileUrl?: StringFilter<"ComplaintAttachment"> | string
    fileName?: StringFilter<"ComplaintAttachment"> | string
    fileType?: StringFilter<"ComplaintAttachment"> | string
    fileSize?: IntFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeFilter<"ComplaintAttachment"> | Date | string
    complaintId?: StringFilter<"ComplaintAttachment"> | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }, "id">

  export type ComplaintAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    fileUrl?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    _count?: ComplaintAttachmentCountOrderByAggregateInput
    _avg?: ComplaintAttachmentAvgOrderByAggregateInput
    _max?: ComplaintAttachmentMaxOrderByAggregateInput
    _min?: ComplaintAttachmentMinOrderByAggregateInput
    _sum?: ComplaintAttachmentSumOrderByAggregateInput
  }

  export type ComplaintAttachmentScalarWhereWithAggregatesInput = {
    AND?: ComplaintAttachmentScalarWhereWithAggregatesInput | ComplaintAttachmentScalarWhereWithAggregatesInput[]
    OR?: ComplaintAttachmentScalarWhereWithAggregatesInput[]
    NOT?: ComplaintAttachmentScalarWhereWithAggregatesInput | ComplaintAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    fileUrl?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    fileName?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    fileType?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    fileSize?: IntWithAggregatesFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintAttachment"> | Date | string
    complaintId?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
  }

  export type ComplaintFeedbackWhereInput = {
    AND?: ComplaintFeedbackWhereInput | ComplaintFeedbackWhereInput[]
    OR?: ComplaintFeedbackWhereInput[]
    NOT?: ComplaintFeedbackWhereInput | ComplaintFeedbackWhereInput[]
    id?: StringFilter<"ComplaintFeedback"> | string
    rating?: IntFilter<"ComplaintFeedback"> | number
    comment?: StringNullableFilter<"ComplaintFeedback"> | string | null
    createdAt?: DateTimeFilter<"ComplaintFeedback"> | Date | string
    complaintId?: StringFilter<"ComplaintFeedback"> | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }

  export type ComplaintFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type ComplaintFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    complaintId?: string
    AND?: ComplaintFeedbackWhereInput | ComplaintFeedbackWhereInput[]
    OR?: ComplaintFeedbackWhereInput[]
    NOT?: ComplaintFeedbackWhereInput | ComplaintFeedbackWhereInput[]
    rating?: IntFilter<"ComplaintFeedback"> | number
    comment?: StringNullableFilter<"ComplaintFeedback"> | string | null
    createdAt?: DateTimeFilter<"ComplaintFeedback"> | Date | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }, "id" | "complaintId">

  export type ComplaintFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    _count?: ComplaintFeedbackCountOrderByAggregateInput
    _avg?: ComplaintFeedbackAvgOrderByAggregateInput
    _max?: ComplaintFeedbackMaxOrderByAggregateInput
    _min?: ComplaintFeedbackMinOrderByAggregateInput
    _sum?: ComplaintFeedbackSumOrderByAggregateInput
  }

  export type ComplaintFeedbackScalarWhereWithAggregatesInput = {
    AND?: ComplaintFeedbackScalarWhereWithAggregatesInput | ComplaintFeedbackScalarWhereWithAggregatesInput[]
    OR?: ComplaintFeedbackScalarWhereWithAggregatesInput[]
    NOT?: ComplaintFeedbackScalarWhereWithAggregatesInput | ComplaintFeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintFeedback"> | string
    rating?: IntWithAggregatesFilter<"ComplaintFeedback"> | number
    comment?: StringNullableWithAggregatesFilter<"ComplaintFeedback"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintFeedback"> | Date | string
    complaintId?: StringWithAggregatesFilter<"ComplaintFeedback"> | string
  }

  export type ComplaintStatusLogWhereInput = {
    AND?: ComplaintStatusLogWhereInput | ComplaintStatusLogWhereInput[]
    OR?: ComplaintStatusLogWhereInput[]
    NOT?: ComplaintStatusLogWhereInput | ComplaintStatusLogWhereInput[]
    id?: StringFilter<"ComplaintStatusLog"> | string
    oldStatus?: EnumComplaintStatusFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    createdAt?: DateTimeFilter<"ComplaintStatusLog"> | Date | string
    complaintId?: StringFilter<"ComplaintStatusLog"> | string
    changedById?: StringFilter<"ComplaintStatusLog"> | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
    changedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ComplaintStatusLogOrderByWithRelationInput = {
    id?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    changedById?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
    changedBy?: UserOrderByWithRelationInput
  }

  export type ComplaintStatusLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintStatusLogWhereInput | ComplaintStatusLogWhereInput[]
    OR?: ComplaintStatusLogWhereInput[]
    NOT?: ComplaintStatusLogWhereInput | ComplaintStatusLogWhereInput[]
    oldStatus?: EnumComplaintStatusFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    createdAt?: DateTimeFilter<"ComplaintStatusLog"> | Date | string
    complaintId?: StringFilter<"ComplaintStatusLog"> | string
    changedById?: StringFilter<"ComplaintStatusLog"> | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
    changedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ComplaintStatusLogOrderByWithAggregationInput = {
    id?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    changedById?: SortOrder
    _count?: ComplaintStatusLogCountOrderByAggregateInput
    _max?: ComplaintStatusLogMaxOrderByAggregateInput
    _min?: ComplaintStatusLogMinOrderByAggregateInput
  }

  export type ComplaintStatusLogScalarWhereWithAggregatesInput = {
    AND?: ComplaintStatusLogScalarWhereWithAggregatesInput | ComplaintStatusLogScalarWhereWithAggregatesInput[]
    OR?: ComplaintStatusLogScalarWhereWithAggregatesInput[]
    NOT?: ComplaintStatusLogScalarWhereWithAggregatesInput | ComplaintStatusLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintStatusLog"> | string
    oldStatus?: EnumComplaintStatusWithAggregatesFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusWithAggregatesFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintStatusLog"> | Date | string
    complaintId?: StringWithAggregatesFilter<"ComplaintStatusLog"> | string
    changedById?: StringWithAggregatesFilter<"ComplaintStatusLog"> | string
  }

  export type NotificationPreferenceWhereInput = {
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    id?: StringFilter<"NotificationPreference"> | string
    userId?: StringFilter<"NotificationPreference"> | string
    email?: BoolFilter<"NotificationPreference"> | boolean
    push?: BoolFilter<"NotificationPreference"> | boolean
    sms?: BoolFilter<"NotificationPreference"> | boolean
    newComplaints?: BoolFilter<"NotificationPreference"> | boolean
    statusUpdates?: BoolFilter<"NotificationPreference"> | boolean
    announcements?: BoolFilter<"NotificationPreference"> | boolean
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    push?: SortOrder
    sms?: SortOrder
    newComplaints?: SortOrder
    statusUpdates?: SortOrder
    announcements?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    email?: BoolFilter<"NotificationPreference"> | boolean
    push?: BoolFilter<"NotificationPreference"> | boolean
    sms?: BoolFilter<"NotificationPreference"> | boolean
    newComplaints?: BoolFilter<"NotificationPreference"> | boolean
    statusUpdates?: BoolFilter<"NotificationPreference"> | boolean
    announcements?: BoolFilter<"NotificationPreference"> | boolean
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type NotificationPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    push?: SortOrder
    sms?: SortOrder
    newComplaints?: SortOrder
    statusUpdates?: SortOrder
    announcements?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationPreferenceCountOrderByAggregateInput
    _max?: NotificationPreferenceMaxOrderByAggregateInput
    _min?: NotificationPreferenceMinOrderByAggregateInput
  }

  export type NotificationPreferenceScalarWhereWithAggregatesInput = {
    AND?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    OR?: NotificationPreferenceScalarWhereWithAggregatesInput[]
    NOT?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationPreference"> | string
    userId?: StringWithAggregatesFilter<"NotificationPreference"> | string
    email?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    push?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    sms?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    newComplaints?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    statusUpdates?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    announcements?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintUncheckedCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintUncheckedCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateUncheckedCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceUncheckedCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUncheckedUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUncheckedUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUncheckedUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUncheckedUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ComplaintCreateInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutComplaintsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedComplaintsInput
    updates?: ComplaintUpdateCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    assignedToId?: string | null
    updates?: ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutComplaintsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedComplaintsNestedInput
    updates?: ComplaintUpdateUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    updates?: ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateManyInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    assignedToId?: string | null
  }

  export type ComplaintUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintUpdateCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutUpdatesInput
    staff?: UserCreateNestedOneWithoutComplaintUpdatesInput
  }

  export type ComplaintUpdateUncheckedCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
    complaintId: string
    staffId?: string | null
  }

  export type ComplaintUpdateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutUpdatesNestedInput
    staff?: UserUpdateOneWithoutComplaintUpdatesNestedInput
  }

  export type ComplaintUpdateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintUpdateCreateManyInput = {
    id?: string
    message: string
    createdAt?: Date | string
    complaintId: string
    staffId?: string | null
  }

  export type ComplaintUpdateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintUpdateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintAttachmentCreateInput = {
    id?: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutAttachmentsInput
  }

  export type ComplaintAttachmentUncheckedCreateInput = {
    id?: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type ComplaintAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintAttachmentCreateManyInput = {
    id?: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintFeedbackCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutFeedbackInput
  }

  export type ComplaintFeedbackUncheckedCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type ComplaintFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintFeedbackCreateManyInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintStatusLogCreateInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutStatusLogsInput
    changedBy: UserCreateNestedOneWithoutStatusChangesInput
  }

  export type ComplaintStatusLogUncheckedCreateInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    complaintId: string
    changedById: string
  }

  export type ComplaintStatusLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutStatusLogsNestedInput
    changedBy?: UserUpdateOneRequiredWithoutStatusChangesNestedInput
  }

  export type ComplaintStatusLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintStatusLogCreateManyInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    complaintId: string
    changedById: string
  }

  export type ComplaintStatusLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintStatusLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationPreferenceCreateInput = {
    id?: string
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationPreferenceInput
  }

  export type NotificationPreferenceUncheckedCreateInput = {
    id?: string
    userId: string
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: BoolFieldUpdateOperationsInput | boolean
    push?: BoolFieldUpdateOperationsInput | boolean
    sms?: BoolFieldUpdateOperationsInput | boolean
    newComplaints?: BoolFieldUpdateOperationsInput | boolean
    statusUpdates?: BoolFieldUpdateOperationsInput | boolean
    announcements?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationPreferenceNestedInput
  }

  export type NotificationPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: BoolFieldUpdateOperationsInput | boolean
    push?: BoolFieldUpdateOperationsInput | boolean
    sms?: BoolFieldUpdateOperationsInput | boolean
    newComplaints?: BoolFieldUpdateOperationsInput | boolean
    statusUpdates?: BoolFieldUpdateOperationsInput | boolean
    announcements?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateManyInput = {
    id?: string
    userId: string
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: BoolFieldUpdateOperationsInput | boolean
    push?: BoolFieldUpdateOperationsInput | boolean
    sms?: BoolFieldUpdateOperationsInput | boolean
    newComplaints?: BoolFieldUpdateOperationsInput | boolean
    statusUpdates?: BoolFieldUpdateOperationsInput | boolean
    announcements?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: BoolFieldUpdateOperationsInput | boolean
    push?: BoolFieldUpdateOperationsInput | boolean
    sms?: BoolFieldUpdateOperationsInput | boolean
    newComplaints?: BoolFieldUpdateOperationsInput | boolean
    statusUpdates?: BoolFieldUpdateOperationsInput | boolean
    announcements?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ComplaintListRelationFilter = {
    every?: ComplaintWhereInput
    some?: ComplaintWhereInput
    none?: ComplaintWhereInput
  }

  export type ComplaintUpdateListRelationFilter = {
    every?: ComplaintUpdateWhereInput
    some?: ComplaintUpdateWhereInput
    none?: ComplaintUpdateWhereInput
  }

  export type NotificationPreferenceNullableScalarRelationFilter = {
    is?: NotificationPreferenceWhereInput | null
    isNot?: NotificationPreferenceWhereInput | null
  }

  export type ComplaintStatusLogListRelationFilter = {
    every?: ComplaintStatusLogWhereInput
    some?: ComplaintStatusLogWhereInput
    none?: ComplaintStatusLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ComplaintOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplaintUpdateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplaintStatusLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    status?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    studentId?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    status?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    studentId?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    status?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    studentId?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumComplaintCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintCategory | EnumComplaintCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintCategoryFilter<$PrismaModel> | $Enums.ComplaintCategory
  }

  export type EnumComplaintStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusFilter<$PrismaModel> | $Enums.ComplaintStatus
  }

  export type EnumComplaintPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintPriority | EnumComplaintPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintPriorityFilter<$PrismaModel> | $Enums.ComplaintPriority
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ComplaintAttachmentListRelationFilter = {
    every?: ComplaintAttachmentWhereInput
    some?: ComplaintAttachmentWhereInput
    none?: ComplaintAttachmentWhereInput
  }

  export type ComplaintFeedbackNullableScalarRelationFilter = {
    is?: ComplaintFeedbackWhereInput | null
    isNot?: ComplaintFeedbackWhereInput | null
  }

  export type ComplaintAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplaintCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
    assignedToId?: SortOrder
  }

  export type ComplaintMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
    assignedToId?: SortOrder
  }

  export type ComplaintMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    hostelBlock?: SortOrder
    roomNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
    assignedToId?: SortOrder
  }

  export type EnumComplaintCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintCategory | EnumComplaintCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintCategoryFilter<$PrismaModel>
    _max?: NestedEnumComplaintCategoryFilter<$PrismaModel>
  }

  export type EnumComplaintStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintStatusFilter<$PrismaModel>
    _max?: NestedEnumComplaintStatusFilter<$PrismaModel>
  }

  export type EnumComplaintPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintPriority | EnumComplaintPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintPriorityWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintPriorityFilter<$PrismaModel>
    _max?: NestedEnumComplaintPriorityFilter<$PrismaModel>
  }

  export type ComplaintScalarRelationFilter = {
    is?: ComplaintWhereInput
    isNot?: ComplaintWhereInput
  }

  export type ComplaintUpdateCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    staffId?: SortOrder
  }

  export type ComplaintUpdateMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    staffId?: SortOrder
  }

  export type ComplaintUpdateMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    staffId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ComplaintAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    fileUrl?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
  }

  export type ComplaintAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type ComplaintAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    fileUrl?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
  }

  export type ComplaintAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    fileUrl?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
  }

  export type ComplaintAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ComplaintFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
  }

  export type ComplaintFeedbackAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ComplaintFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
  }

  export type ComplaintFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
  }

  export type ComplaintFeedbackSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ComplaintStatusLogCountOrderByAggregateInput = {
    id?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    changedById?: SortOrder
  }

  export type ComplaintStatusLogMaxOrderByAggregateInput = {
    id?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    changedById?: SortOrder
  }

  export type ComplaintStatusLogMinOrderByAggregateInput = {
    id?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
    complaintId?: SortOrder
    changedById?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotificationPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    push?: SortOrder
    sms?: SortOrder
    newComplaints?: SortOrder
    statusUpdates?: SortOrder
    announcements?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    push?: SortOrder
    sms?: SortOrder
    newComplaints?: SortOrder
    statusUpdates?: SortOrder
    announcements?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    push?: SortOrder
    sms?: SortOrder
    newComplaints?: SortOrder
    statusUpdates?: SortOrder
    announcements?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ComplaintCreateNestedManyWithoutStudentInput = {
    create?: XOR<ComplaintCreateWithoutStudentInput, ComplaintUncheckedCreateWithoutStudentInput> | ComplaintCreateWithoutStudentInput[] | ComplaintUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutStudentInput | ComplaintCreateOrConnectWithoutStudentInput[]
    createMany?: ComplaintCreateManyStudentInputEnvelope
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
  }

  export type ComplaintCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<ComplaintCreateWithoutAssignedToInput, ComplaintUncheckedCreateWithoutAssignedToInput> | ComplaintCreateWithoutAssignedToInput[] | ComplaintUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutAssignedToInput | ComplaintCreateOrConnectWithoutAssignedToInput[]
    createMany?: ComplaintCreateManyAssignedToInputEnvelope
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
  }

  export type ComplaintUpdateCreateNestedManyWithoutStaffInput = {
    create?: XOR<ComplaintUpdateCreateWithoutStaffInput, ComplaintUpdateUncheckedCreateWithoutStaffInput> | ComplaintUpdateCreateWithoutStaffInput[] | ComplaintUpdateUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutStaffInput | ComplaintUpdateCreateOrConnectWithoutStaffInput[]
    createMany?: ComplaintUpdateCreateManyStaffInputEnvelope
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
  }

  export type NotificationPreferenceCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationPreferenceCreateWithoutUserInput, NotificationPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutUserInput
    connect?: NotificationPreferenceWhereUniqueInput
  }

  export type ComplaintStatusLogCreateNestedManyWithoutChangedByInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutChangedByInput, ComplaintStatusLogUncheckedCreateWithoutChangedByInput> | ComplaintStatusLogCreateWithoutChangedByInput[] | ComplaintStatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutChangedByInput | ComplaintStatusLogCreateOrConnectWithoutChangedByInput[]
    createMany?: ComplaintStatusLogCreateManyChangedByInputEnvelope
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
  }

  export type ComplaintUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ComplaintCreateWithoutStudentInput, ComplaintUncheckedCreateWithoutStudentInput> | ComplaintCreateWithoutStudentInput[] | ComplaintUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutStudentInput | ComplaintCreateOrConnectWithoutStudentInput[]
    createMany?: ComplaintCreateManyStudentInputEnvelope
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
  }

  export type ComplaintUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<ComplaintCreateWithoutAssignedToInput, ComplaintUncheckedCreateWithoutAssignedToInput> | ComplaintCreateWithoutAssignedToInput[] | ComplaintUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutAssignedToInput | ComplaintCreateOrConnectWithoutAssignedToInput[]
    createMany?: ComplaintCreateManyAssignedToInputEnvelope
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
  }

  export type ComplaintUpdateUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<ComplaintUpdateCreateWithoutStaffInput, ComplaintUpdateUncheckedCreateWithoutStaffInput> | ComplaintUpdateCreateWithoutStaffInput[] | ComplaintUpdateUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutStaffInput | ComplaintUpdateCreateOrConnectWithoutStaffInput[]
    createMany?: ComplaintUpdateCreateManyStaffInputEnvelope
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
  }

  export type NotificationPreferenceUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationPreferenceCreateWithoutUserInput, NotificationPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutUserInput
    connect?: NotificationPreferenceWhereUniqueInput
  }

  export type ComplaintStatusLogUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutChangedByInput, ComplaintStatusLogUncheckedCreateWithoutChangedByInput> | ComplaintStatusLogCreateWithoutChangedByInput[] | ComplaintStatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutChangedByInput | ComplaintStatusLogCreateOrConnectWithoutChangedByInput[]
    createMany?: ComplaintStatusLogCreateManyChangedByInputEnvelope
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ComplaintUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ComplaintCreateWithoutStudentInput, ComplaintUncheckedCreateWithoutStudentInput> | ComplaintCreateWithoutStudentInput[] | ComplaintUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutStudentInput | ComplaintCreateOrConnectWithoutStudentInput[]
    upsert?: ComplaintUpsertWithWhereUniqueWithoutStudentInput | ComplaintUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ComplaintCreateManyStudentInputEnvelope
    set?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    disconnect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    delete?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    update?: ComplaintUpdateWithWhereUniqueWithoutStudentInput | ComplaintUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ComplaintUpdateManyWithWhereWithoutStudentInput | ComplaintUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
  }

  export type ComplaintUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<ComplaintCreateWithoutAssignedToInput, ComplaintUncheckedCreateWithoutAssignedToInput> | ComplaintCreateWithoutAssignedToInput[] | ComplaintUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutAssignedToInput | ComplaintCreateOrConnectWithoutAssignedToInput[]
    upsert?: ComplaintUpsertWithWhereUniqueWithoutAssignedToInput | ComplaintUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: ComplaintCreateManyAssignedToInputEnvelope
    set?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    disconnect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    delete?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    update?: ComplaintUpdateWithWhereUniqueWithoutAssignedToInput | ComplaintUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: ComplaintUpdateManyWithWhereWithoutAssignedToInput | ComplaintUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
  }

  export type ComplaintUpdateUpdateManyWithoutStaffNestedInput = {
    create?: XOR<ComplaintUpdateCreateWithoutStaffInput, ComplaintUpdateUncheckedCreateWithoutStaffInput> | ComplaintUpdateCreateWithoutStaffInput[] | ComplaintUpdateUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutStaffInput | ComplaintUpdateCreateOrConnectWithoutStaffInput[]
    upsert?: ComplaintUpdateUpsertWithWhereUniqueWithoutStaffInput | ComplaintUpdateUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: ComplaintUpdateCreateManyStaffInputEnvelope
    set?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    disconnect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    delete?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    update?: ComplaintUpdateUpdateWithWhereUniqueWithoutStaffInput | ComplaintUpdateUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: ComplaintUpdateUpdateManyWithWhereWithoutStaffInput | ComplaintUpdateUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: ComplaintUpdateScalarWhereInput | ComplaintUpdateScalarWhereInput[]
  }

  export type NotificationPreferenceUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationPreferenceCreateWithoutUserInput, NotificationPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutUserInput
    upsert?: NotificationPreferenceUpsertWithoutUserInput
    disconnect?: NotificationPreferenceWhereInput | boolean
    delete?: NotificationPreferenceWhereInput | boolean
    connect?: NotificationPreferenceWhereUniqueInput
    update?: XOR<XOR<NotificationPreferenceUpdateToOneWithWhereWithoutUserInput, NotificationPreferenceUpdateWithoutUserInput>, NotificationPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type ComplaintStatusLogUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutChangedByInput, ComplaintStatusLogUncheckedCreateWithoutChangedByInput> | ComplaintStatusLogCreateWithoutChangedByInput[] | ComplaintStatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutChangedByInput | ComplaintStatusLogCreateOrConnectWithoutChangedByInput[]
    upsert?: ComplaintStatusLogUpsertWithWhereUniqueWithoutChangedByInput | ComplaintStatusLogUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: ComplaintStatusLogCreateManyChangedByInputEnvelope
    set?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    disconnect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    delete?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    update?: ComplaintStatusLogUpdateWithWhereUniqueWithoutChangedByInput | ComplaintStatusLogUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: ComplaintStatusLogUpdateManyWithWhereWithoutChangedByInput | ComplaintStatusLogUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: ComplaintStatusLogScalarWhereInput | ComplaintStatusLogScalarWhereInput[]
  }

  export type ComplaintUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ComplaintCreateWithoutStudentInput, ComplaintUncheckedCreateWithoutStudentInput> | ComplaintCreateWithoutStudentInput[] | ComplaintUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutStudentInput | ComplaintCreateOrConnectWithoutStudentInput[]
    upsert?: ComplaintUpsertWithWhereUniqueWithoutStudentInput | ComplaintUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ComplaintCreateManyStudentInputEnvelope
    set?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    disconnect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    delete?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    update?: ComplaintUpdateWithWhereUniqueWithoutStudentInput | ComplaintUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ComplaintUpdateManyWithWhereWithoutStudentInput | ComplaintUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
  }

  export type ComplaintUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<ComplaintCreateWithoutAssignedToInput, ComplaintUncheckedCreateWithoutAssignedToInput> | ComplaintCreateWithoutAssignedToInput[] | ComplaintUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ComplaintCreateOrConnectWithoutAssignedToInput | ComplaintCreateOrConnectWithoutAssignedToInput[]
    upsert?: ComplaintUpsertWithWhereUniqueWithoutAssignedToInput | ComplaintUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: ComplaintCreateManyAssignedToInputEnvelope
    set?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    disconnect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    delete?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    connect?: ComplaintWhereUniqueInput | ComplaintWhereUniqueInput[]
    update?: ComplaintUpdateWithWhereUniqueWithoutAssignedToInput | ComplaintUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: ComplaintUpdateManyWithWhereWithoutAssignedToInput | ComplaintUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
  }

  export type ComplaintUpdateUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<ComplaintUpdateCreateWithoutStaffInput, ComplaintUpdateUncheckedCreateWithoutStaffInput> | ComplaintUpdateCreateWithoutStaffInput[] | ComplaintUpdateUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutStaffInput | ComplaintUpdateCreateOrConnectWithoutStaffInput[]
    upsert?: ComplaintUpdateUpsertWithWhereUniqueWithoutStaffInput | ComplaintUpdateUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: ComplaintUpdateCreateManyStaffInputEnvelope
    set?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    disconnect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    delete?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    update?: ComplaintUpdateUpdateWithWhereUniqueWithoutStaffInput | ComplaintUpdateUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: ComplaintUpdateUpdateManyWithWhereWithoutStaffInput | ComplaintUpdateUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: ComplaintUpdateScalarWhereInput | ComplaintUpdateScalarWhereInput[]
  }

  export type NotificationPreferenceUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationPreferenceCreateWithoutUserInput, NotificationPreferenceUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPreferenceCreateOrConnectWithoutUserInput
    upsert?: NotificationPreferenceUpsertWithoutUserInput
    disconnect?: NotificationPreferenceWhereInput | boolean
    delete?: NotificationPreferenceWhereInput | boolean
    connect?: NotificationPreferenceWhereUniqueInput
    update?: XOR<XOR<NotificationPreferenceUpdateToOneWithWhereWithoutUserInput, NotificationPreferenceUpdateWithoutUserInput>, NotificationPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type ComplaintStatusLogUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutChangedByInput, ComplaintStatusLogUncheckedCreateWithoutChangedByInput> | ComplaintStatusLogCreateWithoutChangedByInput[] | ComplaintStatusLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutChangedByInput | ComplaintStatusLogCreateOrConnectWithoutChangedByInput[]
    upsert?: ComplaintStatusLogUpsertWithWhereUniqueWithoutChangedByInput | ComplaintStatusLogUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: ComplaintStatusLogCreateManyChangedByInputEnvelope
    set?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    disconnect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    delete?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    update?: ComplaintStatusLogUpdateWithWhereUniqueWithoutChangedByInput | ComplaintStatusLogUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: ComplaintStatusLogUpdateManyWithWhereWithoutChangedByInput | ComplaintStatusLogUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: ComplaintStatusLogScalarWhereInput | ComplaintStatusLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutComplaintsInput = {
    create?: XOR<UserCreateWithoutComplaintsInput, UserUncheckedCreateWithoutComplaintsInput>
    connectOrCreate?: UserCreateOrConnectWithoutComplaintsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedComplaintsInput = {
    create?: XOR<UserCreateWithoutAssignedComplaintsInput, UserUncheckedCreateWithoutAssignedComplaintsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedComplaintsInput
    connect?: UserWhereUniqueInput
  }

  export type ComplaintUpdateCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintUpdateCreateWithoutComplaintInput, ComplaintUpdateUncheckedCreateWithoutComplaintInput> | ComplaintUpdateCreateWithoutComplaintInput[] | ComplaintUpdateUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutComplaintInput | ComplaintUpdateCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintUpdateCreateManyComplaintInputEnvelope
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
  }

  export type ComplaintAttachmentCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
  }

  export type ComplaintFeedbackCreateNestedOneWithoutComplaintInput = {
    create?: XOR<ComplaintFeedbackCreateWithoutComplaintInput, ComplaintFeedbackUncheckedCreateWithoutComplaintInput>
    connectOrCreate?: ComplaintFeedbackCreateOrConnectWithoutComplaintInput
    connect?: ComplaintFeedbackWhereUniqueInput
  }

  export type ComplaintStatusLogCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutComplaintInput, ComplaintStatusLogUncheckedCreateWithoutComplaintInput> | ComplaintStatusLogCreateWithoutComplaintInput[] | ComplaintStatusLogUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutComplaintInput | ComplaintStatusLogCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintStatusLogCreateManyComplaintInputEnvelope
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
  }

  export type ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintUpdateCreateWithoutComplaintInput, ComplaintUpdateUncheckedCreateWithoutComplaintInput> | ComplaintUpdateCreateWithoutComplaintInput[] | ComplaintUpdateUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutComplaintInput | ComplaintUpdateCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintUpdateCreateManyComplaintInputEnvelope
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
  }

  export type ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
  }

  export type ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput = {
    create?: XOR<ComplaintFeedbackCreateWithoutComplaintInput, ComplaintFeedbackUncheckedCreateWithoutComplaintInput>
    connectOrCreate?: ComplaintFeedbackCreateOrConnectWithoutComplaintInput
    connect?: ComplaintFeedbackWhereUniqueInput
  }

  export type ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutComplaintInput, ComplaintStatusLogUncheckedCreateWithoutComplaintInput> | ComplaintStatusLogCreateWithoutComplaintInput[] | ComplaintStatusLogUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutComplaintInput | ComplaintStatusLogCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintStatusLogCreateManyComplaintInputEnvelope
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
  }

  export type EnumComplaintCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ComplaintCategory
  }

  export type EnumComplaintStatusFieldUpdateOperationsInput = {
    set?: $Enums.ComplaintStatus
  }

  export type EnumComplaintPriorityFieldUpdateOperationsInput = {
    set?: $Enums.ComplaintPriority
  }

  export type UserUpdateOneRequiredWithoutComplaintsNestedInput = {
    create?: XOR<UserCreateWithoutComplaintsInput, UserUncheckedCreateWithoutComplaintsInput>
    connectOrCreate?: UserCreateOrConnectWithoutComplaintsInput
    upsert?: UserUpsertWithoutComplaintsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutComplaintsInput, UserUpdateWithoutComplaintsInput>, UserUncheckedUpdateWithoutComplaintsInput>
  }

  export type UserUpdateOneWithoutAssignedComplaintsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedComplaintsInput, UserUncheckedCreateWithoutAssignedComplaintsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedComplaintsInput
    upsert?: UserUpsertWithoutAssignedComplaintsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedComplaintsInput, UserUpdateWithoutAssignedComplaintsInput>, UserUncheckedUpdateWithoutAssignedComplaintsInput>
  }

  export type ComplaintUpdateUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintUpdateCreateWithoutComplaintInput, ComplaintUpdateUncheckedCreateWithoutComplaintInput> | ComplaintUpdateCreateWithoutComplaintInput[] | ComplaintUpdateUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutComplaintInput | ComplaintUpdateCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintUpdateUpsertWithWhereUniqueWithoutComplaintInput | ComplaintUpdateUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintUpdateCreateManyComplaintInputEnvelope
    set?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    disconnect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    delete?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    update?: ComplaintUpdateUpdateWithWhereUniqueWithoutComplaintInput | ComplaintUpdateUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintUpdateUpdateManyWithWhereWithoutComplaintInput | ComplaintUpdateUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintUpdateScalarWhereInput | ComplaintUpdateScalarWhereInput[]
  }

  export type ComplaintAttachmentUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    set?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    disconnect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    delete?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    update?: ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput | ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
  }

  export type ComplaintFeedbackUpdateOneWithoutComplaintNestedInput = {
    create?: XOR<ComplaintFeedbackCreateWithoutComplaintInput, ComplaintFeedbackUncheckedCreateWithoutComplaintInput>
    connectOrCreate?: ComplaintFeedbackCreateOrConnectWithoutComplaintInput
    upsert?: ComplaintFeedbackUpsertWithoutComplaintInput
    disconnect?: ComplaintFeedbackWhereInput | boolean
    delete?: ComplaintFeedbackWhereInput | boolean
    connect?: ComplaintFeedbackWhereUniqueInput
    update?: XOR<XOR<ComplaintFeedbackUpdateToOneWithWhereWithoutComplaintInput, ComplaintFeedbackUpdateWithoutComplaintInput>, ComplaintFeedbackUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintStatusLogUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutComplaintInput, ComplaintStatusLogUncheckedCreateWithoutComplaintInput> | ComplaintStatusLogCreateWithoutComplaintInput[] | ComplaintStatusLogUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutComplaintInput | ComplaintStatusLogCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintStatusLogUpsertWithWhereUniqueWithoutComplaintInput | ComplaintStatusLogUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintStatusLogCreateManyComplaintInputEnvelope
    set?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    disconnect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    delete?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    update?: ComplaintStatusLogUpdateWithWhereUniqueWithoutComplaintInput | ComplaintStatusLogUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintStatusLogUpdateManyWithWhereWithoutComplaintInput | ComplaintStatusLogUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintStatusLogScalarWhereInput | ComplaintStatusLogScalarWhereInput[]
  }

  export type ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintUpdateCreateWithoutComplaintInput, ComplaintUpdateUncheckedCreateWithoutComplaintInput> | ComplaintUpdateCreateWithoutComplaintInput[] | ComplaintUpdateUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintUpdateCreateOrConnectWithoutComplaintInput | ComplaintUpdateCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintUpdateUpsertWithWhereUniqueWithoutComplaintInput | ComplaintUpdateUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintUpdateCreateManyComplaintInputEnvelope
    set?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    disconnect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    delete?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    connect?: ComplaintUpdateWhereUniqueInput | ComplaintUpdateWhereUniqueInput[]
    update?: ComplaintUpdateUpdateWithWhereUniqueWithoutComplaintInput | ComplaintUpdateUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintUpdateUpdateManyWithWhereWithoutComplaintInput | ComplaintUpdateUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintUpdateScalarWhereInput | ComplaintUpdateScalarWhereInput[]
  }

  export type ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    set?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    disconnect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    delete?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    update?: ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput | ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
  }

  export type ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput = {
    create?: XOR<ComplaintFeedbackCreateWithoutComplaintInput, ComplaintFeedbackUncheckedCreateWithoutComplaintInput>
    connectOrCreate?: ComplaintFeedbackCreateOrConnectWithoutComplaintInput
    upsert?: ComplaintFeedbackUpsertWithoutComplaintInput
    disconnect?: ComplaintFeedbackWhereInput | boolean
    delete?: ComplaintFeedbackWhereInput | boolean
    connect?: ComplaintFeedbackWhereUniqueInput
    update?: XOR<XOR<ComplaintFeedbackUpdateToOneWithWhereWithoutComplaintInput, ComplaintFeedbackUpdateWithoutComplaintInput>, ComplaintFeedbackUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintStatusLogCreateWithoutComplaintInput, ComplaintStatusLogUncheckedCreateWithoutComplaintInput> | ComplaintStatusLogCreateWithoutComplaintInput[] | ComplaintStatusLogUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintStatusLogCreateOrConnectWithoutComplaintInput | ComplaintStatusLogCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintStatusLogUpsertWithWhereUniqueWithoutComplaintInput | ComplaintStatusLogUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintStatusLogCreateManyComplaintInputEnvelope
    set?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    disconnect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    delete?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    connect?: ComplaintStatusLogWhereUniqueInput | ComplaintStatusLogWhereUniqueInput[]
    update?: ComplaintStatusLogUpdateWithWhereUniqueWithoutComplaintInput | ComplaintStatusLogUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintStatusLogUpdateManyWithWhereWithoutComplaintInput | ComplaintStatusLogUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintStatusLogScalarWhereInput | ComplaintStatusLogScalarWhereInput[]
  }

  export type ComplaintCreateNestedOneWithoutUpdatesInput = {
    create?: XOR<ComplaintCreateWithoutUpdatesInput, ComplaintUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutUpdatesInput
    connect?: ComplaintWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutComplaintUpdatesInput = {
    create?: XOR<UserCreateWithoutComplaintUpdatesInput, UserUncheckedCreateWithoutComplaintUpdatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutComplaintUpdatesInput
    connect?: UserWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutUpdatesNestedInput = {
    create?: XOR<ComplaintCreateWithoutUpdatesInput, ComplaintUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutUpdatesInput
    upsert?: ComplaintUpsertWithoutUpdatesInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutUpdatesInput, ComplaintUpdateWithoutUpdatesInput>, ComplaintUncheckedUpdateWithoutUpdatesInput>
  }

  export type UserUpdateOneWithoutComplaintUpdatesNestedInput = {
    create?: XOR<UserCreateWithoutComplaintUpdatesInput, UserUncheckedCreateWithoutComplaintUpdatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutComplaintUpdatesInput
    upsert?: UserUpsertWithoutComplaintUpdatesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutComplaintUpdatesInput, UserUpdateWithoutComplaintUpdatesInput>, UserUncheckedUpdateWithoutComplaintUpdatesInput>
  }

  export type ComplaintCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutAttachmentsInput
    connect?: ComplaintWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ComplaintUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutAttachmentsInput
    upsert?: ComplaintUpsertWithoutAttachmentsInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutAttachmentsInput, ComplaintUpdateWithoutAttachmentsInput>, ComplaintUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ComplaintCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<ComplaintCreateWithoutFeedbackInput, ComplaintUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutFeedbackInput
    connect?: ComplaintWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<ComplaintCreateWithoutFeedbackInput, ComplaintUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutFeedbackInput
    upsert?: ComplaintUpsertWithoutFeedbackInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutFeedbackInput, ComplaintUpdateWithoutFeedbackInput>, ComplaintUncheckedUpdateWithoutFeedbackInput>
  }

  export type ComplaintCreateNestedOneWithoutStatusLogsInput = {
    create?: XOR<ComplaintCreateWithoutStatusLogsInput, ComplaintUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutStatusLogsInput
    connect?: ComplaintWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStatusChangesInput = {
    create?: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusChangesInput
    connect?: UserWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutStatusLogsNestedInput = {
    create?: XOR<ComplaintCreateWithoutStatusLogsInput, ComplaintUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutStatusLogsInput
    upsert?: ComplaintUpsertWithoutStatusLogsInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutStatusLogsInput, ComplaintUpdateWithoutStatusLogsInput>, ComplaintUncheckedUpdateWithoutStatusLogsInput>
  }

  export type UserUpdateOneRequiredWithoutStatusChangesNestedInput = {
    create?: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusChangesInput
    upsert?: UserUpsertWithoutStatusChangesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatusChangesInput, UserUpdateWithoutStatusChangesInput>, UserUncheckedUpdateWithoutStatusChangesInput>
  }

  export type UserCreateNestedOneWithoutNotificationPreferenceInput = {
    create?: XOR<UserCreateWithoutNotificationPreferenceInput, UserUncheckedCreateWithoutNotificationPreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationPreferenceInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotificationPreferenceNestedInput = {
    create?: XOR<UserCreateWithoutNotificationPreferenceInput, UserUncheckedCreateWithoutNotificationPreferenceInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationPreferenceInput
    upsert?: UserUpsertWithoutNotificationPreferenceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationPreferenceInput, UserUpdateWithoutNotificationPreferenceInput>, UserUncheckedUpdateWithoutNotificationPreferenceInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumComplaintCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintCategory | EnumComplaintCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintCategoryFilter<$PrismaModel> | $Enums.ComplaintCategory
  }

  export type NestedEnumComplaintStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusFilter<$PrismaModel> | $Enums.ComplaintStatus
  }

  export type NestedEnumComplaintPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintPriority | EnumComplaintPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintPriorityFilter<$PrismaModel> | $Enums.ComplaintPriority
  }

  export type NestedEnumComplaintCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintCategory | EnumComplaintCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintCategory[] | ListEnumComplaintCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintCategoryFilter<$PrismaModel>
    _max?: NestedEnumComplaintCategoryFilter<$PrismaModel>
  }

  export type NestedEnumComplaintStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintStatus | EnumComplaintStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintStatus[] | ListEnumComplaintStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintStatusWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintStatusFilter<$PrismaModel>
    _max?: NestedEnumComplaintStatusFilter<$PrismaModel>
  }

  export type NestedEnumComplaintPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplaintPriority | EnumComplaintPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComplaintPriority[] | ListEnumComplaintPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumComplaintPriorityWithAggregatesFilter<$PrismaModel> | $Enums.ComplaintPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComplaintPriorityFilter<$PrismaModel>
    _max?: NestedEnumComplaintPriorityFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ComplaintCreateWithoutStudentInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: UserCreateNestedOneWithoutAssignedComplaintsInput
    updates?: ComplaintUpdateCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutStudentInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedToId?: string | null
    updates?: ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutStudentInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutStudentInput, ComplaintUncheckedCreateWithoutStudentInput>
  }

  export type ComplaintCreateManyStudentInputEnvelope = {
    data: ComplaintCreateManyStudentInput | ComplaintCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ComplaintCreateWithoutAssignedToInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutComplaintsInput
    updates?: ComplaintUpdateCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutAssignedToInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    updates?: ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutAssignedToInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutAssignedToInput, ComplaintUncheckedCreateWithoutAssignedToInput>
  }

  export type ComplaintCreateManyAssignedToInputEnvelope = {
    data: ComplaintCreateManyAssignedToInput | ComplaintCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type ComplaintUpdateCreateWithoutStaffInput = {
    id?: string
    message: string
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutUpdatesInput
  }

  export type ComplaintUpdateUncheckedCreateWithoutStaffInput = {
    id?: string
    message: string
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintUpdateCreateOrConnectWithoutStaffInput = {
    where: ComplaintUpdateWhereUniqueInput
    create: XOR<ComplaintUpdateCreateWithoutStaffInput, ComplaintUpdateUncheckedCreateWithoutStaffInput>
  }

  export type ComplaintUpdateCreateManyStaffInputEnvelope = {
    data: ComplaintUpdateCreateManyStaffInput | ComplaintUpdateCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type NotificationPreferenceCreateWithoutUserInput = {
    id?: string
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUncheckedCreateWithoutUserInput = {
    id?: string
    email?: boolean
    push?: boolean
    sms?: boolean
    newComplaints?: boolean
    statusUpdates?: boolean
    announcements?: boolean
    updatedAt?: Date | string
  }

  export type NotificationPreferenceCreateOrConnectWithoutUserInput = {
    where: NotificationPreferenceWhereUniqueInput
    create: XOR<NotificationPreferenceCreateWithoutUserInput, NotificationPreferenceUncheckedCreateWithoutUserInput>
  }

  export type ComplaintStatusLogCreateWithoutChangedByInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutStatusLogsInput
  }

  export type ComplaintStatusLogUncheckedCreateWithoutChangedByInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintStatusLogCreateOrConnectWithoutChangedByInput = {
    where: ComplaintStatusLogWhereUniqueInput
    create: XOR<ComplaintStatusLogCreateWithoutChangedByInput, ComplaintStatusLogUncheckedCreateWithoutChangedByInput>
  }

  export type ComplaintStatusLogCreateManyChangedByInputEnvelope = {
    data: ComplaintStatusLogCreateManyChangedByInput | ComplaintStatusLogCreateManyChangedByInput[]
    skipDuplicates?: boolean
  }

  export type ComplaintUpsertWithWhereUniqueWithoutStudentInput = {
    where: ComplaintWhereUniqueInput
    update: XOR<ComplaintUpdateWithoutStudentInput, ComplaintUncheckedUpdateWithoutStudentInput>
    create: XOR<ComplaintCreateWithoutStudentInput, ComplaintUncheckedCreateWithoutStudentInput>
  }

  export type ComplaintUpdateWithWhereUniqueWithoutStudentInput = {
    where: ComplaintWhereUniqueInput
    data: XOR<ComplaintUpdateWithoutStudentInput, ComplaintUncheckedUpdateWithoutStudentInput>
  }

  export type ComplaintUpdateManyWithWhereWithoutStudentInput = {
    where: ComplaintScalarWhereInput
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyWithoutStudentInput>
  }

  export type ComplaintScalarWhereInput = {
    AND?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
    OR?: ComplaintScalarWhereInput[]
    NOT?: ComplaintScalarWhereInput | ComplaintScalarWhereInput[]
    id?: StringFilter<"Complaint"> | string
    title?: StringFilter<"Complaint"> | string
    description?: StringFilter<"Complaint"> | string
    category?: EnumComplaintCategoryFilter<"Complaint"> | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFilter<"Complaint"> | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFilter<"Complaint"> | $Enums.ComplaintPriority
    hostelBlock?: StringFilter<"Complaint"> | string
    roomNumber?: StringFilter<"Complaint"> | string
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    studentId?: StringFilter<"Complaint"> | string
    assignedToId?: StringNullableFilter<"Complaint"> | string | null
  }

  export type ComplaintUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: ComplaintWhereUniqueInput
    update: XOR<ComplaintUpdateWithoutAssignedToInput, ComplaintUncheckedUpdateWithoutAssignedToInput>
    create: XOR<ComplaintCreateWithoutAssignedToInput, ComplaintUncheckedCreateWithoutAssignedToInput>
  }

  export type ComplaintUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: ComplaintWhereUniqueInput
    data: XOR<ComplaintUpdateWithoutAssignedToInput, ComplaintUncheckedUpdateWithoutAssignedToInput>
  }

  export type ComplaintUpdateManyWithWhereWithoutAssignedToInput = {
    where: ComplaintScalarWhereInput
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type ComplaintUpdateUpsertWithWhereUniqueWithoutStaffInput = {
    where: ComplaintUpdateWhereUniqueInput
    update: XOR<ComplaintUpdateUpdateWithoutStaffInput, ComplaintUpdateUncheckedUpdateWithoutStaffInput>
    create: XOR<ComplaintUpdateCreateWithoutStaffInput, ComplaintUpdateUncheckedCreateWithoutStaffInput>
  }

  export type ComplaintUpdateUpdateWithWhereUniqueWithoutStaffInput = {
    where: ComplaintUpdateWhereUniqueInput
    data: XOR<ComplaintUpdateUpdateWithoutStaffInput, ComplaintUpdateUncheckedUpdateWithoutStaffInput>
  }

  export type ComplaintUpdateUpdateManyWithWhereWithoutStaffInput = {
    where: ComplaintUpdateScalarWhereInput
    data: XOR<ComplaintUpdateUpdateManyMutationInput, ComplaintUpdateUncheckedUpdateManyWithoutStaffInput>
  }

  export type ComplaintUpdateScalarWhereInput = {
    AND?: ComplaintUpdateScalarWhereInput | ComplaintUpdateScalarWhereInput[]
    OR?: ComplaintUpdateScalarWhereInput[]
    NOT?: ComplaintUpdateScalarWhereInput | ComplaintUpdateScalarWhereInput[]
    id?: StringFilter<"ComplaintUpdate"> | string
    message?: StringFilter<"ComplaintUpdate"> | string
    createdAt?: DateTimeFilter<"ComplaintUpdate"> | Date | string
    complaintId?: StringFilter<"ComplaintUpdate"> | string
    staffId?: StringNullableFilter<"ComplaintUpdate"> | string | null
  }

  export type NotificationPreferenceUpsertWithoutUserInput = {
    update: XOR<NotificationPreferenceUpdateWithoutUserInput, NotificationPreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationPreferenceCreateWithoutUserInput, NotificationPreferenceUncheckedCreateWithoutUserInput>
    where?: NotificationPreferenceWhereInput
  }

  export type NotificationPreferenceUpdateToOneWithWhereWithoutUserInput = {
    where?: NotificationPreferenceWhereInput
    data: XOR<NotificationPreferenceUpdateWithoutUserInput, NotificationPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type NotificationPreferenceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: BoolFieldUpdateOperationsInput | boolean
    push?: BoolFieldUpdateOperationsInput | boolean
    sms?: BoolFieldUpdateOperationsInput | boolean
    newComplaints?: BoolFieldUpdateOperationsInput | boolean
    statusUpdates?: BoolFieldUpdateOperationsInput | boolean
    announcements?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: BoolFieldUpdateOperationsInput | boolean
    push?: BoolFieldUpdateOperationsInput | boolean
    sms?: BoolFieldUpdateOperationsInput | boolean
    newComplaints?: BoolFieldUpdateOperationsInput | boolean
    statusUpdates?: BoolFieldUpdateOperationsInput | boolean
    announcements?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintStatusLogUpsertWithWhereUniqueWithoutChangedByInput = {
    where: ComplaintStatusLogWhereUniqueInput
    update: XOR<ComplaintStatusLogUpdateWithoutChangedByInput, ComplaintStatusLogUncheckedUpdateWithoutChangedByInput>
    create: XOR<ComplaintStatusLogCreateWithoutChangedByInput, ComplaintStatusLogUncheckedCreateWithoutChangedByInput>
  }

  export type ComplaintStatusLogUpdateWithWhereUniqueWithoutChangedByInput = {
    where: ComplaintStatusLogWhereUniqueInput
    data: XOR<ComplaintStatusLogUpdateWithoutChangedByInput, ComplaintStatusLogUncheckedUpdateWithoutChangedByInput>
  }

  export type ComplaintStatusLogUpdateManyWithWhereWithoutChangedByInput = {
    where: ComplaintStatusLogScalarWhereInput
    data: XOR<ComplaintStatusLogUpdateManyMutationInput, ComplaintStatusLogUncheckedUpdateManyWithoutChangedByInput>
  }

  export type ComplaintStatusLogScalarWhereInput = {
    AND?: ComplaintStatusLogScalarWhereInput | ComplaintStatusLogScalarWhereInput[]
    OR?: ComplaintStatusLogScalarWhereInput[]
    NOT?: ComplaintStatusLogScalarWhereInput | ComplaintStatusLogScalarWhereInput[]
    id?: StringFilter<"ComplaintStatusLog"> | string
    oldStatus?: EnumComplaintStatusFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFilter<"ComplaintStatusLog"> | $Enums.ComplaintStatus
    createdAt?: DateTimeFilter<"ComplaintStatusLog"> | Date | string
    complaintId?: StringFilter<"ComplaintStatusLog"> | string
    changedById?: StringFilter<"ComplaintStatusLog"> | string
  }

  export type UserCreateWithoutComplaintsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    assignedComplaints?: ComplaintCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutComplaintsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    assignedComplaints?: ComplaintUncheckedCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateUncheckedCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceUncheckedCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutComplaintsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutComplaintsInput, UserUncheckedCreateWithoutComplaintsInput>
  }

  export type UserCreateWithoutAssignedComplaintsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintCreateNestedManyWithoutStudentInput
    complaintUpdates?: ComplaintUpdateCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutAssignedComplaintsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintUncheckedCreateNestedManyWithoutStudentInput
    complaintUpdates?: ComplaintUpdateUncheckedCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceUncheckedCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutAssignedComplaintsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedComplaintsInput, UserUncheckedCreateWithoutAssignedComplaintsInput>
  }

  export type ComplaintUpdateCreateWithoutComplaintInput = {
    id?: string
    message: string
    createdAt?: Date | string
    staff?: UserCreateNestedOneWithoutComplaintUpdatesInput
  }

  export type ComplaintUpdateUncheckedCreateWithoutComplaintInput = {
    id?: string
    message: string
    createdAt?: Date | string
    staffId?: string | null
  }

  export type ComplaintUpdateCreateOrConnectWithoutComplaintInput = {
    where: ComplaintUpdateWhereUniqueInput
    create: XOR<ComplaintUpdateCreateWithoutComplaintInput, ComplaintUpdateUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintUpdateCreateManyComplaintInputEnvelope = {
    data: ComplaintUpdateCreateManyComplaintInput | ComplaintUpdateCreateManyComplaintInput[]
    skipDuplicates?: boolean
  }

  export type ComplaintAttachmentCreateWithoutComplaintInput = {
    id?: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
  }

  export type ComplaintAttachmentUncheckedCreateWithoutComplaintInput = {
    id?: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
  }

  export type ComplaintAttachmentCreateOrConnectWithoutComplaintInput = {
    where: ComplaintAttachmentWhereUniqueInput
    create: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintAttachmentCreateManyComplaintInputEnvelope = {
    data: ComplaintAttachmentCreateManyComplaintInput | ComplaintAttachmentCreateManyComplaintInput[]
    skipDuplicates?: boolean
  }

  export type ComplaintFeedbackCreateWithoutComplaintInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ComplaintFeedbackUncheckedCreateWithoutComplaintInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ComplaintFeedbackCreateOrConnectWithoutComplaintInput = {
    where: ComplaintFeedbackWhereUniqueInput
    create: XOR<ComplaintFeedbackCreateWithoutComplaintInput, ComplaintFeedbackUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintStatusLogCreateWithoutComplaintInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    changedBy: UserCreateNestedOneWithoutStatusChangesInput
  }

  export type ComplaintStatusLogUncheckedCreateWithoutComplaintInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    changedById: string
  }

  export type ComplaintStatusLogCreateOrConnectWithoutComplaintInput = {
    where: ComplaintStatusLogWhereUniqueInput
    create: XOR<ComplaintStatusLogCreateWithoutComplaintInput, ComplaintStatusLogUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintStatusLogCreateManyComplaintInputEnvelope = {
    data: ComplaintStatusLogCreateManyComplaintInput | ComplaintStatusLogCreateManyComplaintInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutComplaintsInput = {
    update: XOR<UserUpdateWithoutComplaintsInput, UserUncheckedUpdateWithoutComplaintsInput>
    create: XOR<UserCreateWithoutComplaintsInput, UserUncheckedCreateWithoutComplaintsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutComplaintsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutComplaintsInput, UserUncheckedUpdateWithoutComplaintsInput>
  }

  export type UserUpdateWithoutComplaintsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedComplaints?: ComplaintUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutComplaintsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedComplaints?: ComplaintUncheckedUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUncheckedUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUncheckedUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserUpsertWithoutAssignedComplaintsInput = {
    update: XOR<UserUpdateWithoutAssignedComplaintsInput, UserUncheckedUpdateWithoutAssignedComplaintsInput>
    create: XOR<UserCreateWithoutAssignedComplaintsInput, UserUncheckedCreateWithoutAssignedComplaintsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedComplaintsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedComplaintsInput, UserUncheckedUpdateWithoutAssignedComplaintsInput>
  }

  export type UserUpdateWithoutAssignedComplaintsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUpdateManyWithoutStudentNestedInput
    complaintUpdates?: ComplaintUpdateUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedComplaintsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUncheckedUpdateManyWithoutStudentNestedInput
    complaintUpdates?: ComplaintUpdateUncheckedUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUncheckedUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type ComplaintUpdateUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintUpdateWhereUniqueInput
    update: XOR<ComplaintUpdateUpdateWithoutComplaintInput, ComplaintUpdateUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintUpdateCreateWithoutComplaintInput, ComplaintUpdateUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintUpdateUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintUpdateWhereUniqueInput
    data: XOR<ComplaintUpdateUpdateWithoutComplaintInput, ComplaintUpdateUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintUpdateUpdateManyWithWhereWithoutComplaintInput = {
    where: ComplaintUpdateScalarWhereInput
    data: XOR<ComplaintUpdateUpdateManyMutationInput, ComplaintUpdateUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintAttachmentWhereUniqueInput
    update: XOR<ComplaintAttachmentUpdateWithoutComplaintInput, ComplaintAttachmentUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintAttachmentWhereUniqueInput
    data: XOR<ComplaintAttachmentUpdateWithoutComplaintInput, ComplaintAttachmentUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput = {
    where: ComplaintAttachmentScalarWhereInput
    data: XOR<ComplaintAttachmentUpdateManyMutationInput, ComplaintAttachmentUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ComplaintAttachmentScalarWhereInput = {
    AND?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
    OR?: ComplaintAttachmentScalarWhereInput[]
    NOT?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
    id?: StringFilter<"ComplaintAttachment"> | string
    fileUrl?: StringFilter<"ComplaintAttachment"> | string
    fileName?: StringFilter<"ComplaintAttachment"> | string
    fileType?: StringFilter<"ComplaintAttachment"> | string
    fileSize?: IntFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeFilter<"ComplaintAttachment"> | Date | string
    complaintId?: StringFilter<"ComplaintAttachment"> | string
  }

  export type ComplaintFeedbackUpsertWithoutComplaintInput = {
    update: XOR<ComplaintFeedbackUpdateWithoutComplaintInput, ComplaintFeedbackUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintFeedbackCreateWithoutComplaintInput, ComplaintFeedbackUncheckedCreateWithoutComplaintInput>
    where?: ComplaintFeedbackWhereInput
  }

  export type ComplaintFeedbackUpdateToOneWithWhereWithoutComplaintInput = {
    where?: ComplaintFeedbackWhereInput
    data: XOR<ComplaintFeedbackUpdateWithoutComplaintInput, ComplaintFeedbackUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintFeedbackUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintFeedbackUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintStatusLogUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintStatusLogWhereUniqueInput
    update: XOR<ComplaintStatusLogUpdateWithoutComplaintInput, ComplaintStatusLogUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintStatusLogCreateWithoutComplaintInput, ComplaintStatusLogUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintStatusLogUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintStatusLogWhereUniqueInput
    data: XOR<ComplaintStatusLogUpdateWithoutComplaintInput, ComplaintStatusLogUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintStatusLogUpdateManyWithWhereWithoutComplaintInput = {
    where: ComplaintStatusLogScalarWhereInput
    data: XOR<ComplaintStatusLogUpdateManyMutationInput, ComplaintStatusLogUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ComplaintCreateWithoutUpdatesInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutComplaintsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedComplaintsInput
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutUpdatesInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    assignedToId?: string | null
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutUpdatesInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutUpdatesInput, ComplaintUncheckedCreateWithoutUpdatesInput>
  }

  export type UserCreateWithoutComplaintUpdatesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintCreateNestedManyWithoutAssignedToInput
    notificationPreference?: NotificationPreferenceCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutComplaintUpdatesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintUncheckedCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintUncheckedCreateNestedManyWithoutAssignedToInput
    notificationPreference?: NotificationPreferenceUncheckedCreateNestedOneWithoutUserInput
    statusChanges?: ComplaintStatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutComplaintUpdatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutComplaintUpdatesInput, UserUncheckedCreateWithoutComplaintUpdatesInput>
  }

  export type ComplaintUpsertWithoutUpdatesInput = {
    update: XOR<ComplaintUpdateWithoutUpdatesInput, ComplaintUncheckedUpdateWithoutUpdatesInput>
    create: XOR<ComplaintCreateWithoutUpdatesInput, ComplaintUncheckedCreateWithoutUpdatesInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutUpdatesInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutUpdatesInput, ComplaintUncheckedUpdateWithoutUpdatesInput>
  }

  export type ComplaintUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutComplaintsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedComplaintsNestedInput
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type UserUpsertWithoutComplaintUpdatesInput = {
    update: XOR<UserUpdateWithoutComplaintUpdatesInput, UserUncheckedUpdateWithoutComplaintUpdatesInput>
    create: XOR<UserCreateWithoutComplaintUpdatesInput, UserUncheckedCreateWithoutComplaintUpdatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutComplaintUpdatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutComplaintUpdatesInput, UserUncheckedUpdateWithoutComplaintUpdatesInput>
  }

  export type UserUpdateWithoutComplaintUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUpdateManyWithoutAssignedToNestedInput
    notificationPreference?: NotificationPreferenceUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutComplaintUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUncheckedUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUncheckedUpdateManyWithoutAssignedToNestedInput
    notificationPreference?: NotificationPreferenceUncheckedUpdateOneWithoutUserNestedInput
    statusChanges?: ComplaintStatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type ComplaintCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutComplaintsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedComplaintsInput
    updates?: ComplaintUpdateCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    assignedToId?: string | null
    updates?: ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput
    statusLogs?: ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutAttachmentsInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
  }

  export type ComplaintUpsertWithoutAttachmentsInput = {
    update: XOR<ComplaintUpdateWithoutAttachmentsInput, ComplaintUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutAttachmentsInput, ComplaintUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ComplaintUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutComplaintsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedComplaintsNestedInput
    updates?: ComplaintUpdateUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    updates?: ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateWithoutFeedbackInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutComplaintsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedComplaintsInput
    updates?: ComplaintUpdateCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    statusLogs?: ComplaintStatusLogCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutFeedbackInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    assignedToId?: string | null
    updates?: ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    statusLogs?: ComplaintStatusLogUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutFeedbackInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutFeedbackInput, ComplaintUncheckedCreateWithoutFeedbackInput>
  }

  export type ComplaintUpsertWithoutFeedbackInput = {
    update: XOR<ComplaintUpdateWithoutFeedbackInput, ComplaintUncheckedUpdateWithoutFeedbackInput>
    create: XOR<ComplaintCreateWithoutFeedbackInput, ComplaintUncheckedCreateWithoutFeedbackInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutFeedbackInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutFeedbackInput, ComplaintUncheckedUpdateWithoutFeedbackInput>
  }

  export type ComplaintUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutComplaintsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedComplaintsNestedInput
    updates?: ComplaintUpdateUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    updates?: ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateWithoutStatusLogsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutComplaintsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedComplaintsInput
    updates?: ComplaintUpdateCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackCreateNestedOneWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutStatusLogsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
    assignedToId?: string | null
    updates?: ComplaintUpdateUncheckedCreateNestedManyWithoutComplaintInput
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    feedback?: ComplaintFeedbackUncheckedCreateNestedOneWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutStatusLogsInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutStatusLogsInput, ComplaintUncheckedCreateWithoutStatusLogsInput>
  }

  export type UserCreateWithoutStatusChangesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStatusChangesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintUncheckedCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintUncheckedCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateUncheckedCreateNestedManyWithoutStaffInput
    notificationPreference?: NotificationPreferenceUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStatusChangesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
  }

  export type ComplaintUpsertWithoutStatusLogsInput = {
    update: XOR<ComplaintUpdateWithoutStatusLogsInput, ComplaintUncheckedUpdateWithoutStatusLogsInput>
    create: XOR<ComplaintCreateWithoutStatusLogsInput, ComplaintUncheckedCreateWithoutStatusLogsInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutStatusLogsInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutStatusLogsInput, ComplaintUncheckedUpdateWithoutStatusLogsInput>
  }

  export type ComplaintUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutComplaintsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedComplaintsNestedInput
    updates?: ComplaintUpdateUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUpdateOneWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    updates?: ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput
  }

  export type UserUpsertWithoutStatusChangesInput = {
    update: XOR<UserUpdateWithoutStatusChangesInput, UserUncheckedUpdateWithoutStatusChangesInput>
    create: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatusChangesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatusChangesInput, UserUncheckedUpdateWithoutStatusChangesInput>
  }

  export type UserUpdateWithoutStatusChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStatusChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUncheckedUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUncheckedUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUncheckedUpdateManyWithoutStaffNestedInput
    notificationPreference?: NotificationPreferenceUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationPreferenceInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateCreateNestedManyWithoutStaffInput
    statusChanges?: ComplaintStatusLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutNotificationPreferenceInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    phone?: string | null
    department?: string | null
    studentId?: string | null
    hostelBlock?: string | null
    roomNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    complaints?: ComplaintUncheckedCreateNestedManyWithoutStudentInput
    assignedComplaints?: ComplaintUncheckedCreateNestedManyWithoutAssignedToInput
    complaintUpdates?: ComplaintUpdateUncheckedCreateNestedManyWithoutStaffInput
    statusChanges?: ComplaintStatusLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutNotificationPreferenceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationPreferenceInput, UserUncheckedCreateWithoutNotificationPreferenceInput>
  }

  export type UserUpsertWithoutNotificationPreferenceInput = {
    update: XOR<UserUpdateWithoutNotificationPreferenceInput, UserUncheckedUpdateWithoutNotificationPreferenceInput>
    create: XOR<UserCreateWithoutNotificationPreferenceInput, UserUncheckedCreateWithoutNotificationPreferenceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationPreferenceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationPreferenceInput, UserUncheckedUpdateWithoutNotificationPreferenceInput>
  }

  export type UserUpdateWithoutNotificationPreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUpdateManyWithoutStaffNestedInput
    statusChanges?: ComplaintStatusLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationPreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    hostelBlock?: NullableStringFieldUpdateOperationsInput | string | null
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    complaints?: ComplaintUncheckedUpdateManyWithoutStudentNestedInput
    assignedComplaints?: ComplaintUncheckedUpdateManyWithoutAssignedToNestedInput
    complaintUpdates?: ComplaintUpdateUncheckedUpdateManyWithoutStaffNestedInput
    statusChanges?: ComplaintStatusLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type ComplaintCreateManyStudentInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedToId?: string | null
  }

  export type ComplaintCreateManyAssignedToInput = {
    id?: string
    title: string
    description: string
    category: $Enums.ComplaintCategory
    status?: $Enums.ComplaintStatus
    priority?: $Enums.ComplaintPriority
    hostelBlock: string
    roomNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId: string
  }

  export type ComplaintUpdateCreateManyStaffInput = {
    id?: string
    message: string
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintStatusLogCreateManyChangedByInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    complaintId: string
  }

  export type ComplaintUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: UserUpdateOneWithoutAssignedComplaintsNestedInput
    updates?: ComplaintUpdateUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    updates?: ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutComplaintsNestedInput
    updates?: ComplaintUpdateUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    updates?: ComplaintUpdateUncheckedUpdateManyWithoutComplaintNestedInput
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    feedback?: ComplaintFeedbackUncheckedUpdateOneWithoutComplaintNestedInput
    statusLogs?: ComplaintStatusLogUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumComplaintCategoryFieldUpdateOperationsInput | $Enums.ComplaintCategory
    status?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    priority?: EnumComplaintPriorityFieldUpdateOperationsInput | $Enums.ComplaintPriority
    hostelBlock?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintUpdateUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutUpdatesNestedInput
  }

  export type ComplaintUpdateUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintUpdateUncheckedUpdateManyWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintStatusLogUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutStatusLogsNestedInput
  }

  export type ComplaintStatusLogUncheckedUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintStatusLogUncheckedUpdateManyWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaintId?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintUpdateCreateManyComplaintInput = {
    id?: string
    message: string
    createdAt?: Date | string
    staffId?: string | null
  }

  export type ComplaintAttachmentCreateManyComplaintInput = {
    id?: string
    fileUrl: string
    fileName: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
  }

  export type ComplaintStatusLogCreateManyComplaintInput = {
    id?: string
    oldStatus: $Enums.ComplaintStatus
    newStatus: $Enums.ComplaintStatus
    createdAt?: Date | string
    changedById: string
  }

  export type ComplaintUpdateUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staff?: UserUpdateOneWithoutComplaintUpdatesNestedInput
  }

  export type ComplaintUpdateUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintUpdateUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintAttachmentUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintStatusLogUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: UserUpdateOneRequiredWithoutStatusChangesNestedInput
  }

  export type ComplaintStatusLogUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedById?: StringFieldUpdateOperationsInput | string
  }

  export type ComplaintStatusLogUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    oldStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    newStatus?: EnumComplaintStatusFieldUpdateOperationsInput | $Enums.ComplaintStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedById?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}