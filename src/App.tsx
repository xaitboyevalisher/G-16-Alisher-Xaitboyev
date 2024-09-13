import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Company from "./components/Sidebar/Company";
import Job from "./components/Sidebar/Job";
import { Provider } from "react-redux";
import { store } from "./components/Sidebar/store";

const { Content, Sider } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState<string>("1");

  const handleMenuSelect = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <Provider store={store}>
      <Layout>
        <Sider width={200}>
          <Sidebar onSelect={handleMenuSelect} />
        </Sider>

        <Layout>
          <Content style={{ padding: "20px" }}>
            {selectedKey === "1" && <Company />}
            {selectedKey === "2" && <Job />}
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default App;
