import Footer from './footer';
import Header from './header';
import Head from 'next/head';
import Seo from '../seo';
import { isEmpty } from 'lodash';
import { sanitize } from '../../utils/misc';
import PropTypes from 'prop-types';
function Layout( { data, isPost, children } ) {
  const { page, post, posts, header, footer, headerMenus, footerMenus } =
    data || {};

  // If it does not have either post or page.
  if ( isEmpty( page ) && isEmpty( post ) && isEmpty( posts ) ) {
    return null;
  }
  // console.log(children);
  //
  const seo = isPost ? post?.seo ?? {} : page?.seo ?? {};
  const uri = isPost ? post?.uri ?? {} : page?.uri ?? {};

  return (
    <div>
      <Seo seo={seo} uri={uri} />
      <Head>
        <link rel="shortcut icon" href={header?.favicon} />
        {seo?.schemaDetails ? (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{ __html: sanitize( seo.schemaDetails ) }}
          />
        ) : null}
      </Head>
      <Header header={header} headerMenus={headerMenus?.edges} />
      <div className="md:container px-5 py-24 mx-auto min-h-almost-screen">{children}</div>
      <Footer footer={footer} footerMenus={footerMenus?.edges} />
    </div>
  );
}

Layout.propTypes = {
  data: PropTypes.object,
  isPost: PropTypes.bool,
  children: PropTypes.object
};

Layout.defaultProps = {
  data: {},
  isPost: false,
  children: {}
};

export default Layout;
