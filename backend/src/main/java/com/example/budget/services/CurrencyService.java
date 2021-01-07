package com.example.budget.services;

import com.example.budget.dao.currency.CurrencyDao;
import com.example.budget.model.Currency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService {

    private final CurrencyDao currencyDao;

    @Autowired
    public CurrencyService(
            @Qualifier("postgres_currencies") CurrencyDao currencyDao
    ) {
        this.currencyDao = currencyDao;
    }

    public List<Currency> getAllCurrencies() {
        return currencyDao.selectAllCurrencies();
    }
}
