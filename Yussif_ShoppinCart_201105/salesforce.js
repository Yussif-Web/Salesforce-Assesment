
window.onload = function () {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var table = document.getElementById('cartTable');
    var selectInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all')
    var tr = table.children[1].rows;
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    var deleteAll = document.getElementById('deleteAll');
    var selectedViewList = document.getElementById('selectedViewList');
    var selected = document.getElementById('selected');
    var foot = document.getElementById('foot');

    function getTotal() {
        var selected = 0, price = 0, html = '';
        for (var i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                tr[i].className = 'on';
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].getElementsByTagName('td')[4].innerHTML);
                html += '<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'"></span></div>';
            }else{
                tr[i].className = '';
            }
        }
        selectedTotal.innerHTML = selected;
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = html;
        if (selected==0) {
            foot.className = 'foot';
        }
    }

    function getSubtotal(tr) {
        var cells = tr.cells;
        var price = cells[2];
        var subtotal = cells[4];
        var countInput = tr.getElementsByTagName('input')[1];
        var span = tr.getElementsByTagName('span')[1];
        
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);

        if (countInput.value == 1) {
            span.innerHTML = '';
        }else{
            span.innerHTML = '-';
        }
    }

    for(var i = 0; i < selectInputs.length; i++ ){
        selectInputs[i].onclick = function () {
            if (this.className.indexOf('check-all') >= 0) {
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;
                }
            }
            if (!this.checked) {
                for (var i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false;
                }
            }
            getTotal();
        }
    }

    selected.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
        }
    }

    selectedViewList.onclick = function (e) {
        var e = e || window.event;
        var el = e.srcElement;
        if (el.className=='del') {
            var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
            input.checked = false;
            input.onclick();
        }
    }

    for (var i = 0; i < tr.length; i++) {
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement;
            var cls = el.className;
            var countInout = this.getElementsByTagName('input')[1];
            var value = parseInt(countInout.value);
            switch (cls) {
                case 'add':
                    countInout.value = value + 1;
                    getSubtotal(this);
                    break;
                case 'reduce': 
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'delete':
                    var conf = confirm('');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break;
            }
            getTotal();
        }

        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
            getSubtotal(this.parentNode.parentNode);
            getTotal();
        }
    }

    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            var con = confirm('');
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        } else {
            alert('');
        }
        getTotal();
    }

    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();
}
