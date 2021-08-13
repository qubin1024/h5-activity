const utils = require("./utils")
// @ponicode
describe("utils.assetsPath", () => {
    test("0", () => {
        let callFunction = () => {
            utils.assetsPath("C:\\\\path\\to\\file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            utils.assetsPath(".")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            utils.assetsPath("path/to/file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            utils.assetsPath("C:\\\\path\\to\\folder\\")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            utils.assetsPath("./path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            utils.assetsPath(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("utils.styleLoaders", () => {
    test("0", () => {
        let callFunction = () => {
            utils.styleLoaders("C:\\\\path\\to\\file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            utils.styleLoaders("/path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            utils.styleLoaders("path/to/file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            utils.styleLoaders("path/to/folder/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            utils.styleLoaders("./path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            utils.styleLoaders(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
