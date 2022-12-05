import './Pagination.css'

const Pagination = ({ page, total,  setPage }) => {
	const totalPages = Math.ceil(total / 5);

	const onClick = (newPage) => {
		setPage(newPage + 1);
	};

	return (
		<div className="pcontainer">
			{totalPages > 0 &&
				[...Array(totalPages)].map((val, index) => (
					<button
						onClick={() => onClick(index)}
						className={
							page === index + 1
								? "ppage_btn pactive"
								: 'ppage_btn'
						}
						key={index}
					>
						{index + 1}
					</button>
				))}
		</div>
	);
};

export default Pagination;
