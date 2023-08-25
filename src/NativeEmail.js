// @flow
import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  open: (title: string, newTask: boolean) => Promise<boolean>;
  compose: (title: string, to: string, subject: string, body: string, cc: string, bcc: string) => void;
}

export default (TurboModuleRegistry.get<Spec>("Email"): ?Spec);
