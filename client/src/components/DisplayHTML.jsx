import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';


DisplayHTML.propTypes = {
  htmlContent: PropTypes.string
}
export default function DisplayHTML({ htmlContent }) {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedHTML,
      }}
    />
  );
}