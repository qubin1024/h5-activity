const rewire = require("rewire")
const check_versions = rewire("./check-versions")
const exec = check_versions.__get__("exec")
// @ponicode
describe("exec", () => {
    test("0", () => {
        let callFunction = () => {
            exec("./path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            exec(".")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            exec("C:\\\\path\\to\\folder\\")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            exec("path/to/folder/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            exec("/path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            exec(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
