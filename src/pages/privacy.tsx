import styled from 'styled-components';
import { Content } from '@/components/blocks/BaseBlock';
import { H1 } from '@/components/elements/Header';
import { media } from '@/lib/styled/media';
import { Page, PageProps } from '@/lib/types';

type Props = {
  //
};

const Statement = styled(Content)`
  margin-bottom: 30px;
  padding: 10px 30px 0;

  h1 {
    padding: 30px 0;
  }

  .h2 {
    margin-bottom: 0;
    color: #707070;
    font-size: 26px;
    font-weight: 300;
    line-height: 1.67;
  }

  .h3 {
    margin: 15px 0 30px;
    color: #333;
    font-size: 20px;
    line-height: 1.67;
  }

  .content {
    margin-top: 30px;
    color: #707070;
    font-size: 18px;
    line-height: 1.67;
  }

  ${media.big} {
    margin-bottom: 50px;
    padding: 0 15px;

    h1 {
      padding: 50px 0;
    }

    .h2 {
      font-size: 22px;
    }
  }
`;

const Privacy: Page<Props> = (_props: PageProps<Props>) => {
  return (
    <>
      <Statement>
        <H1>
          Privacy statement /<br /> cookies
        </H1>

        <div className="h2">
          This Privacy Statement applies to Lofoten Arctic Water and is responsible for processing
          the company’s handling of personal information on its own website. See the contact page
          for contact information.
        </div>

        <div className="content">
          The privacy statement applies to our websites (“Website”). The privacy statement describes
          how we collect, use and share personal information when you enter into an agreement to use
          our websites, how we register information through cookies about your use of our websites,
          and exchange information with third parties.
          <br />
          <br />
          The privacy statement does not apply to third party websites, and Lofoten Arctic Water
          does not take responsibility for the processing of personal data on these websites.
          <br />
          <br />
          Personal information is information and assessments that can be linked to an individual.
          Our processing of personal data takes place within the framework of the general rules in
          the Norwegian Personal Data Act with regulations, as well as other relevant regulations,
          such as the Marketing Act and the Accounting Act.
          <br />
          <br />
          Our website is: https://www.lofoten-water.co.kr.
          <br />
          <br />
          Processing of personal data at www.lofoten-water.co.kr
          <br />
          <br />
          The web editor has the day-to-day responsibility for Lofoten Arctic Water’s processing of
          personal data on www.lofoten-water.com, unless otherwise stated below. It is voluntary for
          those who visit the websites to provide personal information in connection with services,
          such as receiving newsletters. The basis for treatment is the consent of the individual,
          unless otherwise specified.
          <br />
          <br />
          Information collected in connection with the operation of a website is stored on separate
          servers operated by Google Analytics. Only Lofoten Arctic Water has access to the
          information collected.
          <br />
          <br />
          Contact form
          <br />
          Information collected via the contact form is only used to contact you in connection with
          the specific inquiry. All inquiries are only used by Lofoten Arctic Water and are deleted
          no later than 1 year after the customer relationship has ended.
          <br />
          <br />
          Web statistics
          <br />
          Lofoten Arctic Water collects unidentified information about visitors to Google Analytics
          and Google AdSense. The purpose of this is to compile statistics that we use to improve
          and further develop the information offered on the website. Examples of what the
          statistics provide answers to are how many people visit different pages, how long the
          visit lasts, which websites the users come from and which browsers are used. The
          information is processed in deidentified and aggregated form. By deidentified is meant
          that we cannot trace the information we collect back to the individual user. We collect
          the entire IP address, but the IP address is deidentified so that only the first three
          groups in the address are used to generate statistics. That is, if the IP address consists
          of the numbers 195.159.103.82, only 195.159.103.xx is used. In addition, the IP addresses
          are processed at an aggregate level, i.e. all data is merged into a group and not
          processed individually.We use the analysis tool Google Analytics on our website.
          Information from this tool is not disclosed from Lofoten Arctic Water to other players.
          <br />
          <br />
          Embedded content from other sites
          <br />
          Articles on this site may contain embedded content (e.g. videos, images, articles, etc.).
          Embedded content from other sites behaves in exactly the same way as if the visitor had
          visited the other site.
          <br />
          <br />
          These sites may collect data about you, use cookies, post additional third-party tracking
          and monitor your interaction with the embedded content, including tracking the interaction
          with the embedded content if you have an account and are logged into the site.
          <br />
          <br />
          Cookies
          <br />
          Cookies are small text files that are placed on your computer when you download a website.
          <br />
          <br />
          Storage of information and processing of this information is not permitted unless the user
          has both been informed of and has given his consent to the processing. The user shall be
          informed of and approve which information is processed, what the purpose of the processing
          is and who processes the information, cf. Electronic Communications Act § 2-7b. The
          following cookies are used on lofoten-water.com:
          <br />
          <br />
          The analytics tool Google Analytics places two cookies on your computer (these start with
          ga, _gid, _gat, AMP_TOKEN and _gac “property-id”). This is done so that we can collect
          statistics and is deleted after 90 days.
          <br />
          <br />
          How to manage cookies (nettvett.no)
          <br />
          <br />
          Contact information Email: contact@lofoten-water.co.kr
          <br />
          <br />
          Phone: +82-2-000-0000
          <br />
          <br />
          Postal address: ???
        </div>
      </Statement>
    </>
  );
};

Privacy.layoutProps = {
  title: 'Privacy',
};

export default Privacy;
