// @flow
import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  open: (title: string, newTask: boolean) => Promise<boolean>;
  openWith: (packageName: string) => Promise<boolean>;
  compose: (title: string, to: string, subject: string, body: string, cc: string, bcc: string) => void;
  getEmailClients: () => Promise<{
    androidPackageName: string;
    title: string;
    prefix: string;
    iOSAppName: string;
    id: string;
  }[]>;
}

export default (TurboModuleRegistry.get<Spec>("Email"): ?Spec);
