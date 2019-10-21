/* /components/layouts/article-right-rail.jsx */
import React from 'react'
const ArticleRightRail = (props) => {
    return (
        <div className='row'>
            <header className='col-12 fixed-on-small'>
                {props.children[0]}
            </header>
            <section className='col-12'>
                <div className='row'>
                    <article className='col-xs-12 col-md-8'>
                        {props.children[1]}
                    </article>
                    <aside className='col-xs-12 col-md-4'>
                        {props.children[2]}
                    </aside>
                </div>
            </section>
            <footer className='col-12 text-center'>
                {props.children[3]}
                <p>Infobae &copy; 2019</p>
            </footer>
        </div>
    )
}
ArticleRightRail.sections = ['header', 'main', 'sidebar', 'footer']
export default ArticleRightRail