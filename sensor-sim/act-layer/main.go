package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

const temperatureThreshold = 30.0

type SensorReading struct {
	DeviceID string
	Metric   string
	Value    float64
}

type ActResult struct {
	DeviceID string
	Alert    bool
	Message  string
}

func parseReading(deviceID string, valueText string) (SensorReading, error) {
	value, err := strconv.ParseFloat(valueText, 64)
	if err != nil {
		return SensorReading{}, fmt.Errorf("invalid reading %q: %w", valueText, err)
	}
	if deviceID == "" {
		return SensorReading{}, errors.New("device ID is required")
	}
	return SensorReading{DeviceID: deviceID, Metric: "temperature", Value: value}, nil
}

func evaluate(reading SensorReading) ActResult {
	if reading.Value > temperatureThreshold {
		return ActResult{DeviceID: reading.DeviceID, Alert: true, Message: "cooling required"}
	}
	return ActResult{DeviceID: reading.DeviceID, Alert: false, Message: "within threshold"}
}

func evaluateAsync(reading SensorReading) <-chan ActResult {
	results := make(chan ActResult, 1)
	go func() {
		results <- evaluate(reading)
	}()
	return results
}

func main() {
	deviceID := "temp-01"
	valueText := "31.5"
	if len(os.Args) > 1 {
		valueText = os.Args[1]
	}

	reading, err := parseReading(deviceID, valueText)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	result := <-evaluateAsync(reading)
	fmt.Printf("device=%s metric=%s value=%.1f alert=%t action=%s\n", reading.DeviceID, reading.Metric, reading.Value, result.Alert, result.Message)
}
