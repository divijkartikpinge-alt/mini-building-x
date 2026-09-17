package main

import "testing"

func TestEvaluateAsyncAlertsAboveThreshold(t *testing.T) {
	reading := SensorReading{DeviceID: "temp-01", Metric: "temperature", Value: 31.5}
	result := <-evaluateAsync(reading)

	if !result.Alert {
		t.Fatal("expected an alert above the threshold")
	}
	if result.Message != "cooling required" {
		t.Fatalf("unexpected action: %s", result.Message)
	}
}

func TestParseReadingRejectsInvalidValue(t *testing.T) {
	_, err := parseReading("temp-01", "not-a-number")
	if err == nil {
		t.Fatal("expected invalid input to return an error")
	}
}
