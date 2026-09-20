import {test} from "@playwright/test";

test.describe("User story", () => {

    test.beforeAll(async () => {
        console.log("Before all test cases");
    });

    test.afterAll(async () => {
        console.log("After all test cases");
    });

    test.beforeEach(async () => {
        console.log("Before each test case");
    });

    test.afterEach(async () => {
        console.log("After each test case");
    });

    test("Test Case 1", async () => {
        console.log("Test Case 1 is exected");
    });

    test("Test Case 2", async () => {
        console.log("Test Case 2 is exected");
    });

    test("Test Case 3", async () => {
        console.log("Test Case 3 is exected");
    });

    test("Test Case 4", async () => {
        console.log("Test Case 4 is exected");
    });
});

