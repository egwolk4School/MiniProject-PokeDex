import PropTypes from 'prop-types'
import '../DexComp.css'
export const Pagination = ({
    current = 1,
    totalItems = 0,
    itemsPerPage = 0,
    onPageChange=1,
}) => {
   
    if (totalItems <= 75) return null

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const pageButtons = []

    const startPage = Math.max(1, current - 2)
    const endPage = Math.min(totalPages, current + 2)

    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                style={{ fontWeight: current === i ? 'bold' : 'normal' }}
            >
                {i}
            </button>
        )
    }

    return (
        <div>
            {current > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>{'<<'}</button>
                    <button onClick={() => onPageChange(current - 1)}>{'<'}</button>
                </>
            )}
            {pageButtons}
            {current < totalPages && (
                <>
                    <button onClick={() => onPageChange(current + 1)}>{'>'}</button>
                    <button onClick={() => onPageChange(totalPages)} className=''>{'>>'}</button>
                </>
            )}
        </div>
    )
}

Pagination.propTypes = {
    current: PropTypes.number,
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
}
