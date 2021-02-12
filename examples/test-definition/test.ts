import { expectType, TypeEqual } from "../..";
import { Foo } from './example'

expectType<Foo>(new Foo());
expectType<TypeEqual<[], Parameters<typeof Foo.prototype.method>>>(true);
expectType<TypeEqual<boolean, ReturnType<typeof Foo.prototype.method>>>(true);
