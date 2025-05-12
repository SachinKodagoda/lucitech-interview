// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider } from "antd";

const outputPath = "./app/styles/antd.min.css";

const css = extractStyle((node) => (
  <ConfigProvider
    theme={{
      components: {
        Table: {
          borderColor: "rgba(0,0,0,0.15)",
          headerBg: "#333333",
          headerColor: "#fff",
          headerFilterHoverBg: "#333333",
          headerSplitColor: "#333333",
          headerSortActiveBg: "#333333",
          headerSortHoverBg: "#333333",
          cellPaddingBlock: 10,
        },
      },
      token: {
        colorPrimary: "#013b8e",
        colorSuccess: "#378410",
        colorWarning: "#dc9d1e",
        colorError: "#a90b0d",
      },
    }}
  >
    {node}
  </ConfigProvider>
));

fs.writeFileSync(outputPath, css);

// biome-ignore lint/suspicious/noConsole: <explanation>
console.log(`🎉 Antd CSS generated at ${outputPath}`);
