import * as React from 'react';
import Header from 'app/components/common/Header';

export const App: React.StatelessComponent<{}> = (props) => {
  return (
    <div className="container-fluid">
      <Header />
      {props.children}
    </div>
  );
}
