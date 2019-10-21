import PropTypes from 'prop-types'

const HTMLBox = (props) => {
    const { html } = props.customFields;

    return (
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
    );
}

HTMLBox.label = 'HTML Box'
HTMLBox.propTypes = {
    customFields: PropTypes.shape({
        html: PropTypes.text.isRequired
    })
}
export default HTMLBox