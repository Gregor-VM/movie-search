import React from 'react'

function Layout({children}) {
    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout
