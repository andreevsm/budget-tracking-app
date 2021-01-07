package com.example.budget.dao.currency;

import com.example.budget.model.Currency;

import java.util.List;

public interface CurrencyDao {
    List<Currency> selectAllCurrencies();
}
