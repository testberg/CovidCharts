import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4b9d8e',
          },
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 16,
            },
          }}
        >
          {node}
        </ConfigProvider>
      </ConfigProvider>
    </>
  )

export default withTheme;