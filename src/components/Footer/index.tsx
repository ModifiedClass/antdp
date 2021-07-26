import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {

  return (
    <DefaultFooter
      copyright={`2020 ***`}
      links={[
        {
          key: 'key1',
          title: 'title1',
          href: '',
          blankTarget: true,
        },
        {
          key: 'key2',
          title: 'title2',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};
