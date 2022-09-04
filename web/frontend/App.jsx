import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import {I18nContext, I18nManager} from '@shopify/react-i18n';

import {
  AppBridgeProvider,
  DiscountProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

const locale = 'it';
const i18nManager = new I18nManager({
  locale,
  onError(error) {
    // Bugsnag.notify(error);
  },
});

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <I18nContext.Provider value={i18nManager}>
      <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <NavigationMenu
                  navigationLinks={[
                    {
                      label: 'New volume discount',
                      destination: '/Volume/new'
                    }
                  ]}
                />
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </PolarisProvider>
    </I18nContext.Provider>
  );
}
