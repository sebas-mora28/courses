import PropTypes from 'prop-types';

export default function Page({children}) {
  return (
    <div>
      <h2>I am the page component</h2>
      {children}
    </div>
  );
}

Page.PropTypes = {
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
}
