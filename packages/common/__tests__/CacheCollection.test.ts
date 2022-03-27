import { expect } from "chai";

import { CacheCollection } from "..";
const zeroOrNegativeErrorMessage = "Cannot pass 0 or negative value as maxSize.";

it("Successful construction with default cache maxSize", () => {
    expect(new CacheCollection().maxSize).to.equal(Infinity);
    expect(() => new CacheCollection({ maxSize: undefined })).not.throw;
});

it("Abiding by cache maxSize", () => {
    const cache = new CacheCollection({ maxSize: 500 });
    for (let i = 0; i < 505; i++) {
        cache.set(`test-${i}`, i);
    }
    expect(cache.size).to.equal(500);
});

it("Properly error on invalid maxSize being passed", () => {
    expect(() => new CacheCollection({ maxSize: 0 })).to.throw(TypeError, zeroOrNegativeErrorMessage);
    expect(() => new CacheCollection({ maxSize: -1 })).to.throw(TypeError, zeroOrNegativeErrorMessage);
});
