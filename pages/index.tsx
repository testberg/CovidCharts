import { Row, Layout, Typography, Grid } from "antd";
const { Content } = Layout;
import { trpc } from "../src/utils/trpc";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter } from "~/server/routers/_app";
import PageHeader from "components/PageHeader";
import Filters from "components/Filters";
import ChartContainer from "components/ChartContainer";

const chartsTitles = ["May 2023 COVID-19 Cases", "April 2023 Weekly New Cases"];

const { Title } = Typography;

export default function Home() {
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
  const utils = trpc.useContext();
  const favsQuery = trpc.fav.list.useQuery();
  const addPost = trpc.fav.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.fav.list.invalidate();
    },
  });

  const removePost = trpc.fav.remove.useMutation({
    async onSuccess() {
      // refetches posts after a post is removed
      await utils.fav.list.invalidate();
    },
  });

  const handle = async (favTitle: string) => {
    if (
      favsQuery.data?.items?.filter((el: { title: string }) => {
        return el.title === favTitle;
      }).length === 0
    ) {
      type Input = inferProcedureInput<AppRouter["fav"]["add"]>;
      const input: Input = {
        title: favTitle as string,
      };

      await addPost.mutateAsync(input);
    } else {
      type Input = inferProcedureInput<AppRouter["fav"]["remove"]>;
      const input: Input = {
        title: favTitle as string,
      };

      await removePost.mutateAsync(input);
    }
  };

  const contentStyle: React.CSSProperties = {
    padding: lg ? "0 95px" : "0 20px",
    textAlign: "center",
    marginBottom: 10,
  };

  const contentWrapperStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginRight: 10,
    flexDirection: lg ? "row" : "column",
    overflow: "hidden",
  };

  return (
    <Layout>
      <PageHeader />
      <Content style={contentStyle}>
        <div style={contentWrapperStyle}>
          <Title style={titleStyle}>Page title</Title>
          <Filters />
        </div>
        <Row gutter={[32, 32]}>
          {chartsTitles.map((chartTitle, index) => (
            <ChartContainer
              key={chartTitle}
              items={favsQuery.data?.items}
              index={index}
              chartTitle={chartTitle}
              handle={handle}
            />
          ))}
        </Row>
      </Content>
    </Layout>
  );
}

const titleStyle: React.CSSProperties = {
  textAlign: "left",
  fontSize: 16,
  lineHeight: "16px",
  margin: "32px 0",
  width: "100%",
  whiteSpace: "nowrap",
  color: "rgba(0, 0, 0, 0.88)",
};
