import { toSlug } from "@/lib/slug";

describe("toSlug", () => {
  it("converts spaces to hyphens", () => {
    expect(toSlug("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(toSlug("Café Déjà Vu!")).toBe("cafe-deja-vu");
  });

  it("trims multiple spaces/hyphens", () => {
    expect(toSlug("   hello   ---   world   ")).toBe("hello-world");
  });

  it("lowercases the string", () => {
    expect(toSlug("NFT PROJECT")).toBe("nft-project");
  });
});
