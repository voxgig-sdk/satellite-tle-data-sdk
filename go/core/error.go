package core

type SatelliteTleDataError struct {
	IsSatelliteTleDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSatelliteTleDataError(code string, msg string, ctx *Context) *SatelliteTleDataError {
	return &SatelliteTleDataError{
		IsSatelliteTleDataError: true,
		Sdk:              "SatelliteTleData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SatelliteTleDataError) Error() string {
	return e.Msg
}
