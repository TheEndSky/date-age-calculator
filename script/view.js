//          TODO > Input Rules
//- Any field is empty when the form is submitted
//   - The day number is not between 1-31
//   - The month number is not between 1-12
//   - The year is in the future
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)

class View {
    // properties >     name    days    dateNum(single-digit if)
    months = [
        {
            name: 'January',
            days: 31,
            dateNum:1
        },
        {
            name: 'February',
            days: 28,
            dateNum:2
        },
        {
            name: 'March',
            days: 31,
            dateNum:3
        },
        {
            name: 'April',
            days: 30,
            dateNum:4
        },
        {
            name: 'May',
            days: 31,
            dateNum:5
        },
        {
            name: 'June',
            days: 30,
            dateNum:6
        },
        {
            name: 'July',
            days: 31,
            dateNum:7
        },
        {
            name: 'August',
            days: 31,
            dateNum:8
        },
        {
            name: 'September',
            days: 30,
            dateNum:9
        },
        {
            name: 'October',
            days: 31,
            dateNum:10
        },
        {
            name: 'November',
            days: 30,
            dateNum:11
        },
        {
            name: 'December',
            days: 31,
            dateNum:12
        },
    ]

    $ = {};
    $$ = {};

    #qs(selector,parent) {

    const el = parent ? 
    parent.querySelector(selector) :
    document.querySelector(selector)

    if (!el) throw new Error ('Selector was not reached')
    
    return el
    }

    constructor() {
        this.$.btn = this.#qs('#arrow-btn')
        this.$.form = this.#qs('#form')
        this.$.errormsg = this.#qs('#error')
        this.$.errormsg2 = this.#qs('#error2')
        this.$.errormsg3 = this.#qs('#error3')
        // Input Value elements
        this.$.year = this.#qs('#year')
        this.$.months = this.#qs('#months')
        this.$.days = this.#qs('#days')

        // Display Variables

        this.$.dispYear = this.#qs('.inp-year')
        this.$.dispMonth = this.#qs('.inp-month')
        this.$.dispDay = this.#qs('.inp-day')
        this.$$.inputsEl = document.querySelectorAll('input[type]')
      

    }
    
   isFormComplete() {
    this.$.form.addEventListener('submit', (e) => {
        
        e.preventDefault()
        this.checkErrors()
        this.calculateAge()
    })
   }
   setMaxLength() {
        this.$$.inputsEl.forEach(input => {
            input.addEventListener('input', () => {
                
                if (input.value.length > input.getAttribute('maxlength')) {
                    input.value = input.value.slice(0, input.getAttribute('maxlength'))
                }
            })
        })
    }
    setErrorFor(input,message,error) {
        const parent = input.parentElement;
        const icon = parent.querySelector('i');
        icon.classList.add('error')

        input.classList.add('onError');
        error.classList.add('error')
        error.innerText = message;
        
    

    }   
    removeErrorFor(input,error) {
        const parent = input.parentElement;
        const icon = parent.querySelector('i');
        icon.classList.remove('error')

        input.classList.remove('onError');
        error.classList.remove('error')
        
    }

    checkErrors() {

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth()  + 1;
        const currentYear = currentDate.getFullYear();


       this.checkDays()

 
        if (this.$.months.value === '' || this.$.months.value < 1 || this.$.months.value > 12) {
            this.setErrorFor(this.$.months, "Select a valid input",this.$.errormsg2)
            this.removeDisplay(this.$.dispMonth)
        } else {
            this.removeErrorFor(this.$.months, this.$.errormsg2)
            this.sucessDisplay(this.$.dispMonth, this.$.months)
        }
        


         if (this.$.year.value === '' || this.$.year.value < 1) {
            this.setErrorFor(this.$.year, "Select a valid input",this.$.errormsg3)
            this.removeDisplay(this.$.dispYear)
        } else if(this.$.year.value > currentYear) {
            this.setErrorFor(this.$.year, "You can't pick the future",this.$.errormsg3)
            this.removeDisplay(this.$.dispYear)
        } else{
            this.removeErrorFor(this.$.year, this.$.errormsg3)
            this.sucessDisplay(this.$.dispYear, this.$.year)
        }
        
        
        if(this.$.year.value >= currentYear & this.$.days.value > currentDay
            || this.$.year.value >= currentYear & this.$.months.value > currentMonth
            || this.$.year.value >= currentYear & this.$.months.value > currentMonth 
            & this.$.days.value > currentDay) {
                this.setErrorFor(this.$.days, "You cant go over current date", this.$.errormsg)
                this.removeDisplay(this.$.dispDay)
                this.setErrorFor(this.$.months, "You cant go over current date", this.$.errormsg2)
                this.removeDisplay(this.$.dispMonth)
                this.setErrorFor(this.$.year, "You cant go over current date", this.$.errormsg3)
                this.removeDisplay(this.$.dispYear)
            }
       
    }

    checkDays() {
        if(this.$.months.value !== '' & this.$.months.value > 0 & this.$.months.value <= 12){
            let maxday = this.months[this.$.months.value -1].days
            let currentMonth = this.months[this.$.months.value -1].name
            if (this.$.days.value > 0 & this.$.days.value <= maxday) {
                this.removeErrorFor(this.$.days, this.$.errormsg)
                this.sucessDisplay(this.$.dispDay, this.$.days)
            } else if(this.$.days.value <= 0 || this.$.days.value === '') {
                this.setErrorFor(this.$.days, "Select a valid input",this.$.errormsg)
                this.removeDisplay(this.$.dispDay)
            }
            else {
                this.setErrorFor(this.$.days, `Max day for ${currentMonth} is ${maxday}`,this.$.errormsg)
                this.removeDisplay(this.$.dispDay)
            }
        } else if(this.$.months.value == '' || this.$.months.value == 0 || this.$.months.value >12) {
            let backupMaxDay = 31
            if (this.$.days.value > backupMaxDay) {
                this.setErrorFor(this.$.days, "You can't go over 31 days",this.$.errormsg)
                this.removeDisplay(this.$.dispDay)
            } else if(this.$.days.value == '' || this.$.days.value <= 0) {
                this.setErrorFor(this.$.days, "Select a valid input",this.$.errormsg)
                this.removeDisplay(this.$.dispDay)
            } else {
                this.removeErrorFor(this.$.days, this.$.errormsg)
                this.sucessDisplay(this.$.dispDay, this.$.days)
            }
        } 
        
    }


    init() {
    this.isFormComplete()
    this.setMaxLength()
    }

    sucessDisplay(display, input) {
        
        display.textContent = input.value 
        if(display.classList.contains('animation-2')) {
            display.classList.remove('animation-2')
        }
        display.classList.add('success')

    }

    removeDisplay(display) {
        display.textContent = '--'
        
        if (display.classList.contains('success')) {
            display.classList.remove('success')
        }
         display.classList.add('animation-2')
    }

    calculateAge() {
        if(this.$.dispYear.classList.contains('success')
        & this.$.dispDay.classList.contains('success')
        & this.$.dispMonth.classList.contains('success')
        ) {
            const currentAge = new Date();
            const months = this.months;

           

            //set Date > Lesser than Current;
            const numYear = +this.$.year.value;
            const totalNumYear = numYear * 365;
            const numMonth = +this.$.months.value;
            const numDay = +this.$.days.value;
            let daysSinceDate = 0 ;

            for (let i = 0; i < numMonth - 1; i++) {
            daysSinceDate += months[i].days;
            }
            const finalPastDay = (daysSinceDate + numDay + totalNumYear) 




             //Current Date
            const currentYear = +currentAge.getFullYear();
            const currentTotalYear = currentYear * 365;
            const currentMonth = +currentAge.getMonth() + 1 ;
            const currentDay = +currentAge.getDate();
            let daysSinceCurrent = 0;

            for (let i = 0; i < currentMonth -1; i++) {
            
            daysSinceCurrent += months[i].days;
            }



            //Calculate Final day diff
            const finalDay = (daysSinceCurrent + currentDay + currentTotalYear) 


            const finalDate = finalDay - finalPastDay 
            console.log(finalDate)
            const getYears = finalDate /365
            console.log(getYears)
            let getMonths = finalDate % 365
            const getDay =  getMonths % 30

            getMonths = getMonths /(365/12) ;

            console.log(getMonths)
            console.log('DAY SHOULD BE:' + getDay)

            this.$.dispYear.textContent = Math.floor(getYears)
            this.$.dispMonth.textContent = Math.floor(getMonths)
            this.$.dispDay.textContent = Math.floor(getDay)

            } 
        }
}   

const App  = new View();
window.addEventListener('load', App.init())





