import { useTheme } from "../Hooks/useTheme"

export default function Header() {
  // if (isDark) {
  //   document.body.classList.add('dark')
  // } else {
  //   document.body.classList.remove('dark')
  // }

  const [isDark , setIsDark] = useTheme()
  
  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
        <div className="header-content">
            <h2 className="title"><a href="/">Where in the World?</a></h2>
            <p className="theme-changer" onClick={() => {
              setIsDark(!isDark)
              localStorage.setItem('IsDarkMode' , !isDark)
            }}>
              <i className= {`fa-solid fa-${isDark ? 'sun' : 'moon'}`} />&nbsp;&nbsp;{isDark ? 'Light' : 'Dark'} Mode </p>
        </div>
    </header>
  )
}
