import '@testing-library/jest-dom/extend-expect';  // Za dodatne asserte iz jest-dom
import { configure } from '@testing-library/react';

// Nastavitve za JSDOM
configure({ testIdAttribute: 'data-testid' });

// Zaženi dodatne nastavitve (če je potrebno)
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
