import "./global.css"
import LoginInfo from "../components/LoginInfo";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
				<div className="maindiv">
					<div className="logodiv">
						<div className="logodiv_left"></div>
						<div className="logodiv_right"></div>
					</div>		
					<LoginInfo />	
					<div className="childrendiv">
					{children}
					</div>
				</div>
			</body>
        </html>
    );
}