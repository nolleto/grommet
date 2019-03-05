import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { deepMerge } from '../../utils';

import { Anchor } from '../Anchor';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Image } from '../Image';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

interface IComponents {
  [key: string]: HTMLElement;
}

interface IGrommetMarkdown {
  components: IComponents;
  options: any;
  theme: any;
}

class GrommetMarkdown extends React.Component<IGrommetMarkdown> {
  public render() {
    const { components, options, theme, ...rest } = this.props;

    const heading = [1, 2, 3, 4].reduce((obj, level) => {
      const result = { ...obj };
      result[`h${level}`] = {
        component: Heading,
        props: { level },
      };
      return result;
    }, {});

    const overrides = deepMerge(
      {
        a: { component: Anchor },
        img: { component: Image },
        p: { component: Paragraph },
        table: { component: Table },
        td: { component: TableCell },
        tbody: { component: TableBody },
        tfoot: { component: TableFooter },
        th: { component: TableCell },
        thead: { component: TableHeader },
        tr: { component: TableRow },
      },
      heading,
      components,
      options && options.overrides,
    );

    return <Markdown options={{ ...options, overrides }} {...rest} />;
  }
}

let GrommetMarkdownDoc;
if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line:no-var-requires
  GrommetMarkdownDoc = require('./doc').doc(GrommetMarkdown);
}
const GrommetMarkdownWrapper = GrommetMarkdownDoc || GrommetMarkdown;

export { GrommetMarkdownWrapper as Markdown };
