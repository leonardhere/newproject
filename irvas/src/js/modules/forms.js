import checkNumInputs from './checkNumInputs'

const forms = () => {
    const form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input');


    checkNumInputs('input[name="user_phone"]')
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо, скоро мы с вами свяжемся.',
        failture: 'Что-то пошло не так.'
    }

    const postData = async (url, data) => {
        document.querySelector('.message').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text()
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage)

            const formData = new formData(item)

            postData('assets/server.php', formData).then(res => {
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failture)
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 5000)
            })
        })
    })

}

export default forms;