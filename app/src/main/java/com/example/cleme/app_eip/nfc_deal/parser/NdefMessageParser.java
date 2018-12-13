package com.example.cleme.app_eip.nfc_deal.parser;

import android.nfc.NdefMessage;
import android.nfc.NdefRecord;

import com.example.cleme.app_eip.nfc_deal.record.SmartPoster;
import com.example.cleme.app_eip.nfc_deal.record.ParseNdefRecord;
import com.example.cleme.app_eip.nfc_deal.record.TextRecord;
import com.example.cleme.app_eip.nfc_deal.record.UriRecord;

import java.util.ArrayList;
import java.util.List;

public class NdefMessageParser {

    private NdefMessageParser() {
    }

    public static List<ParseNdefRecord> parse(NdefMessage message) {
        return (getRecords(message.getRecords()));
    }

    public static List<ParseNdefRecord> getRecords(NdefRecord[] records) {
        List<ParseNdefRecord> elements = new ArrayList<ParseNdefRecord>();

        for (final NdefRecord record : records) {
            if (UriRecord.isUri(record)) {
                elements.add(UriRecord.parse(record));
            } else if (TextRecord.isText(record)) {
                elements.add(TextRecord.parse(record));
            } else if (SmartPoster.isPoster(record)) {
                elements.add(SmartPoster.parse(record));
            } else {
                elements.add(new ParseNdefRecord() {
                    @Override
                    public String str() {
                        return (new String(record.getPayload()));
                    }
                });
            }
        }
        return (elements);
    }
}