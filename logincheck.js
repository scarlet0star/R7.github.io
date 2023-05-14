// 로그인 체크
if (!localStorage.getItem("access")) {
    alert('로그인이 필요합니다!')
    window.history.back()
}
