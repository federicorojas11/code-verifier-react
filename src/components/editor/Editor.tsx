import react from "react";
import { Highlight, themes } from "prism-react-renderer";
import styles from "styles.module.css";

interface EditorProps {
  language?: any;
  children?: any;
  solution?: any;
}

const codeBlock = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}`;

export const Editor = ({ language, children, solution }: EditorProps) => {
  return (
    <Highlight theme={themes.shadesOfPurple} code={solution} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
