# XSS Sanitization with DOMPurify

`Why?` To protect against XSS, always sanitize HTML from users or backend before rendering.

`Tool:` Use dompurify for sanitizing HTML.

## Server-Side (Node.js)

    -> Needs a DOM-like environment → install jsdom.
    -> Eg:
        import createDOMPurify from 'dompurify';
        import { JSDOM } from 'jsdom';

        const DOMPurify = createDOMPurify(new JSDOM('').window);
        const clean = DOMPurify.sanitize(dirtyHTML);

## Client-Side (React)

    -> Directly use dompurify to sanitize and safely render HTML:
    -> Eg:
        import DOMPurify from 'dompurify';

        const SafeHTML = ({ html }) => (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
        );
