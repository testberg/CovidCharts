import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Slider,
  Switch,
  Image,
  Layout,
  Space,
  Typography,
  Avatar,
  Divider,
  Card,
  Badge,
  Grid,
  Skeleton,
} from 'antd';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { DotChartOutlined } from '@ant-design/icons';
import NextError from 'next/error';
import { useContext } from 'react';
import {
  MdOutlineMessage,
  MdOutlineFileDownload,
  MdOutlineFilterList,
} from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
const { Header, Content } = Layout;
import ComponentDount from '../components/ComponentPie';
import ComponentColumns from '../components/ComponentColumns';
import { useRouter } from 'next/router';
import { trpc } from '../src/utils/trpc';
import { inferProcedureInput } from '@trpc/server';
import { AppRouter } from '~/server/routers/_app';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 50,
  paddingInline: 50,
  lineHeight: '50px',
  backgroundColor: '#ffffff',
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  zIndex: 1,
};

const titleStyle: React.CSSProperties = {
  textAlign: 'left',
  fontSize: 16,
  lineHeight: '16px',
  margin: '32px 0',
  width: '100%',
  whiteSpace: 'nowrap',
  color: 'rgba(0, 0, 0, 0.88)',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  padding: '0 24px',
  justifyContent: 'space-between',
  color: '#c4c7ca',
  fontSize: '15px',
  cursor: 'default',
};

const logoStyle: React.CSSProperties = {
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 'bold',
  color: 'hsl(172.5deg 45.45% 17.25%)',
};

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
      // refetches posts after a post is added
      await utils.fav.list.invalidate();
    },
  });

  const handle = async (favTitle: string) => {
    if (
      favsQuery.data?.items?.filter((el: { title: string }) => {
        return el.title === favTitle;
      }).length === 0
    ) {
      type Input = inferProcedureInput<AppRouter['fav']['add']>;
      //    ^?
      const input: Input = {
        title: favTitle as string,
      };

      await addPost.mutateAsync(input);
    } else {
      type Input = inferProcedureInput<AppRouter['fav']['remove']>;
      //    ^?
      const input: Input = {
        title: favTitle as string,
      };

      await removePost.mutateAsync(input);
    }
  };

  const contentStyle: React.CSSProperties = {
    padding: lg ? '0 95px' : '0 20px',
    textAlign: 'center',
    marginBottom: 10,
  };

  return (
    <Layout>
      <Header style={headerStyle}>
        <div style={logoStyle}>App title</div>
      </Header>
      <Content style={contentStyle}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: 10,
            flexDirection: lg ? 'row' : 'column',
            overflow: 'hidden',
          }}
        >
          <Title style={titleStyle}>Page title</Title>
          <Space
            direction="horizontal"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '450px',
              marginBottom: lg ? '0' : '10px',
            }}
          >
            <Button
              className={'button'}
              icon={<MdOutlineFileDownload size={24} color={'#4b9d8e'} />}
            >
              Export to PDF
            </Button>
            <Button
              className={'button'}
              icon={<HiOutlineBars3BottomLeft size={24} color={'#4b9d8e'} />}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                Notes
                <span
                  style={{
                    color: '#c4c7ca',
                    marginLeft: 5,
                  }}
                >
                  {'(3)'}
                </span>
              </div>
            </Button>
            <Button
              className={'button'}
              icon={<MdOutlineFilterList size={24} color={'#4b9d8e'} />}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                Filter
                <div>
                  <Badge
                    color={'primary'}
                    count={'9+'}
                    style={{
                      fontSize: '10px',
                      width: '20px',
                      padding: 0,
                      height: '20px',
                      marginBottom: 3,
                      marginLeft: 5,
                      backgroundColor: '#4b9d8e',
                    }}
                  />
                </div>
              </div>
            </Button>
          </Space>
        </div>
        <Row gutter={[32, 32]}>
          {['May 2023 COVID-19 Cases', 'April 2023 Weekly New Cases'].map(
            (chartTitle, index) => (
              <Col xs={{ span: 24 }} md={{ span: 12 }} key={chartTitle}>
                <Card
                  hoverable
                  title={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '15px',
                        color: 'black',
                        fontWeight: 'bold',
                        cursor: 'default',
                      }}
                    >
                      {chartTitle}
                      {favsQuery.data?.items?.filter(
                        (el: { title: string }) => {
                          return el.title === chartTitle;
                        },
                      ).length === 0 ? (
                        <FaHeart
                          style={{
                            cursor: 'pointer',
                          }}
                          color={'red'}
                          size={24}
                          onClick={() => handle(chartTitle)}
                        />
                      ) : (
                        <FaRegHeart
                          color={'red'}
                          size={24}
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => handle(chartTitle)}
                        />
                      )}
                    </div>
                  }
                  bordered={false}
                  actions={[
                    <div style={footerStyle}>
                      <Avatar
                        size={'default'}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          fontSize: 18,
                        }}
                      >
                        <>3</>
                        <MdOutlineMessage
                          size={32}
                          style={{
                            transform: 'scaleX(-1)',
                            marginLeft: 5,
                          }}
                        />
                      </div>
                    </div>,
                  ]}
                >
                  <div
                    style={{
                      position: 'relative',
                      height: 400,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <Skeleton.Node
                        style={{ height: 400, width: 400 }}
                        active={true}
                      >
                        <DotChartOutlined
                          style={{ fontSize: 40, color: '#bfbfbf' }}
                        />
                      </Skeleton.Node>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 10,
                      }}
                    >
                      {index === 0 ? <ComponentColumns /> : <ComponentDount />}
                    </div>
                  </div>
                </Card>
              </Col>
            ),
          )}
        </Row>
      </Content>
    </Layout>
  );
}
