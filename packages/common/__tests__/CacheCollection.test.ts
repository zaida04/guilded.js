import { CacheCollection } from "..";
const zeroOrNegativeErrorMessage = "Cannot pass 0 or negative value as maxSize.";

test("Successful construction with default cache maxSize", () => {
    expect(new CacheCollection().maxSize).toStrictEqual(Infinity);
    expect(() => new CacheCollection({ maxSize: undefined })).not.toThrow();
});

test("Abiding by cache maxSize", () => {
    const cache = new CacheCollection({ maxSize: 500 });
    for (let i = 0; i < 505; i++) {
        cache.set(`test-${i}`, i);
    }
    expect(cache.size).toStrictEqual(500);
});

test("Properly error on invalid maxSize being passed", () => {
    expect(() => new CacheCollection({ maxSize: 0 })).toThrow(new TypeError(zeroOrNegativeErrorMessage));
    expect(() => new CacheCollection({ maxSize: -1 })).toThrow(new TypeError(zeroOrNegativeErrorMessage));
});
