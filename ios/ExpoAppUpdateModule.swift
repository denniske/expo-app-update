import ExpoModulesCore
import Foundation


public class ExpoAppUpdateModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ExpoAppUpdate')` in JavaScript.
        Name("ExpoAppUpdate")
        
        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants([
            "PI": Double.pi
        ])
        
        // Defines event names that the module can send to JavaScript.
        Events("onChange")
        
        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("hello") {
            return "Hello world! 👋"
        }
        
        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("getAppUpdateInfo") { (promise: Promise) in
            self.log("getAppUpdateInfo")
            
            checkAppVersion { isAvailable, version in
                self.log("isAvailable: \(isAvailable)")
                self.log("version: \(version ?? "")")

                promise.resolve([
                    "updateAvailable": isAvailable,
                    "ios": [
                      "version": version
                    ]
                ])
            }
        }
        
        // Enables the module to be used as a native view. Definition components that are accepted as part of the
        // view definition: Prop, Events.
        View(ExpoAppUpdateView.self) {
            // Defines a setter for the `name` prop.
            Prop("name") { (view: ExpoAppUpdateView, prop: String) in
                print(prop)
            }
        }
    }

    func log(_ message: String) {
        self.sendEvent("onChange", ["_": message])
    }
    
    func checkAppVersion(completion: @escaping (Bool, String?) -> Void) {
        
       guard let bundleId = Bundle.main.bundleIdentifier,
             let currentVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String else {
           completion(false, nil)
           return
       }

        self.log("Bundle ID: \(bundleId)")

        let updateUrl = "https://itunes.apple.com/lookup?bundleId=\(bundleId)"
        
        guard let url = URL(string: updateUrl) else {
            completion(false, nil)
            return
        }
        
        let task = URLSession.shared.dataTask(with: url) { data, response, error in

            guard let data = data, error == nil else {
                completion(false, nil)
                return
            }

            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                   let results = json["results"] as? [[String: Any]],
                   !results.isEmpty,
                   let appInfo = results.first,
                   let version = appInfo["version"] as? String {

                    self.log("App version: \(version)")
                    self.log("Current version: \(currentVersion)")

                    let isAvailable = (version.compare(currentVersion, options: .numeric) == .orderedDescending)
                    
                    completion(isAvailable, version)
                } else {
                    completion(false, nil)
                }
            } catch {
                completion(false, nil)
            }
        }
        
        task.resume()
    }
}
