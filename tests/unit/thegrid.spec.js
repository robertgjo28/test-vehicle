import TheGrid from "@/components/List/TheGrid.vue";
import { shallowMount } from "@vue/test-utils";

describe("TheGrid.vue", () => {
  test("renders inner text", () => {
    const wrapper = shallowMount(TheGrid);
    // Assertion (testing the text inside)

    expect(wrapper.text()).toContain("Research");
  });
});
