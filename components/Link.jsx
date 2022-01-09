import NextLink from 'next/link';

export { Link };

function Link({ href, children, ...props }) {
    return (
        <NextLink className="link" href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}
